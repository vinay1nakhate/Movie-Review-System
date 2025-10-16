const express = require('express')
const db = require('../db/db')
const { createResult } = require('../utils/result')
const router = express.Router()


// ADD a review (1 per user per movie)
router.post('/', (req, res) => {
    const { movie_id, user_id, rating, comment } = req.body

    if (!movie_id || !user_id || !rating) {
        res.send(createResult('Missing required fields (movie_id, user_id, rating)'))
        return
    }

    if (rating < 1 || rating > 5) {
        res.send(createResult('Rating must be between 1 and 5'))
        return
    }

    // Check if user already added a review for this movie
    const checkSql = `SELECT * FROM reviews WHERE movie_id = ? AND user_id = ?`
    db.query(checkSql, [movie_id, user_id], (err, resultCheck) => {
        if (err) {
            res.send(createResult(err))
            return
        }

        if (resultCheck.length > 0) {
            res.send(createResult('User has already added a review for this movie'))
            return
        }

        // Insert new review
        const insertSql = `
            INSERT INTO reviews (movie_id, user_id, rating, comment)
            VALUES (?, ?, ?, ?)
        `
        db.query(insertSql, [movie_id, user_id, rating, comment], (err, resultInsert) => {
            res.send(createResult(err, resultInsert))
        })
    })
})


// GET reviews by movie (supports infinite scroll / pagination)
// Example: GET /reviews/movie/1?user_id=7&limit=20&offset=0
router.get('/movie/:movie_id', (req, res) => {
    const { movie_id } = req.params
    const { user_id, limit = 20, offset = 0 } = req.query

    const sql = `
        SELECT 
            r.review_id,
            r.movie_id,
            r.user_id,
            r.rating,
            r.comment,
            r.review_date,
            m.title AS movie_title,
            CONCAT(u.firstName, ' ', u.lastName) AS reviewer_name,
            CASE WHEN r.user_id = ? THEN 0 ELSE 1 END AS sort_order
        FROM reviews r
        INNER JOIN movies m ON r.movie_id = m.movie_id
        INNER JOIN user u ON r.user_id = u.id
        WHERE r.movie_id = ?
        ORDER BY sort_order, r.review_date DESC
        LIMIT ? OFFSET ?
    `

    db.query(sql, [user_id || 0, movie_id, parseInt(limit), parseInt(offset)], (err, resultData) => {
        res.send(createResult(err, resultData))
    })
})


// GET review by review_id
router.get('/:review_id', (req, res) => {
    const { review_id } = req.params
    const sql = `
        SELECT r.review_id, r.movie_id, r.user_id, r.rating, r.comment, r.review_date,
               m.title AS movie_title,
               CONCAT(u.firstName, ' ', u.lastName) AS reviewer_name
        FROM reviews r
        INNER JOIN movies m ON r.movie_id = m.movie_id
        INNER JOIN user u ON r.user_id = u.id
        WHERE r.review_id = ?
    `
    db.query(sql, [review_id], (err, resultData) => {
        res.send(createResult(err, resultData[0]))
    })
})


// UPDATE a review (only by owner)
router.put('/:review_id', (req, res) => {
    const { review_id } = req.params
    const { user_id, rating, comment } = req.body

    if (!user_id) {
        res.send(createResult('User ID required to update review'))
        return
    }

    if (rating !== undefined && (rating < 1 || rating > 5)) {
        res.send(createResult('Rating must be between 1 and 5'))
        return
    }

    // Verify ownership
    const checkSql = `SELECT * FROM reviews WHERE review_id = ? AND user_id = ?`
    db.query(checkSql, [review_id, user_id], (err, resultCheck) => {
        if (err) {
            res.send(createResult(err))
            return
        }

        if (resultCheck.length === 0) {
            res.send(createResult('You can only update your own review'))
            return
        }

        // Build dynamic update SQL
        let fields = []
        let values = []

        if (rating !== undefined) {
            fields.push('rating = ?')
            values.push(rating)
        }

        if (comment !== undefined) {
            fields.push('comment = ?')
            values.push(comment)
        }

        if (fields.length === 0) {
            res.send(createResult('No fields provided to update'))
            return
        }

        const updateSql = `UPDATE reviews SET ${fields.join(', ')} WHERE review_id = ?`
        values.push(review_id)

        db.query(updateSql, values, (err, resultUpdate) => {
            res.send(createResult(err, resultUpdate))
        })
    })
})


// DELETE a review (only by owner)
router.delete('/:review_id', (req, res) => {
    const { review_id } = req.params
    const { user_id } = req.body

    if (!user_id) {
        res.send(createResult('User ID required to delete review'))
        return
    }

    // Verify ownership
    const checkSql = `SELECT * FROM reviews WHERE review_id = ? AND user_id = ?`
    db.query(checkSql, [review_id, user_id], (err, resultCheck) => {
        if (err) {
            res.send(createResult(err))
            return
        }

        if (resultCheck.length === 0) {
            res.send(createResult('You can only delete your own review'))
            return
        }

        const deleteSql = `DELETE FROM reviews WHERE review_id = ?`
        db.query(deleteSql, [review_id], (err, resultDelete) => {
            res.send(createResult(err, resultDelete))
        })
    })
})

module.exports = router
