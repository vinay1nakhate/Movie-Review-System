const express = require('express')
const pool = require('../db/db')
const result = require('../utils/result')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'images' })

// Get all movies
router.get('/', (req, res) => {
    const sql = `
        SELECT m.movie_id, m.title, m.release_date, m.release_year,
               m.image, c.name AS category
        FROM movies m
        LEFT JOIN categories c ON m.category_id = c.category_id
        ORDER BY m.title
    `
    db.query(sql, (err, result) => {
        res.send(createResult(err, result))
    })
})

// Get movie by ID
router.get('/:movie_id', (req, res) => {
    const { movie_id } = req.params
    const sql = `
        SELECT m.movie_id, m.title, m.release_date, m.release_year,
               m.image, c.name AS category
        FROM movies m
        LEFT JOIN categories c ON m.category_id = c.category_id
        WHERE m.movie_id = ?
    `
    db.query(sql, [movie_id], (err, result) => {
        res.send(createResult(err, result[0]))
    })
})

module.exports = router