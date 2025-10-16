import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Typography, Grid, Box, Paper, Divider, LinearProgress, AppBar, Toolbar, Button } from '@mui/material'
import API from '../api/api'
import RatingStars from '../components/RatingStars'
import ReviewList from '../components/ReviewList'
import ReviewForm from '../components/ReviewForm'
import { useSelector } from 'react-redux'

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [reviews, setReviews] = useState([])
  const [ratingStats, setRatingStats] = useState({1:0,2:0,3:0,4:0,5:0})
  const user = JSON.parse(localStorage.getItem('user'))
  const [editingReview, setEditingReview] = useState(null)
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/movie/${id}?user_id=${user?.id || 0}&limit=50&offset=0`)
      if (res.data.status === 'success') {
        const revs = res.data.data
        setReviews(revs)
        const stats = {1:0,2:0,3:0,4:0,5:0}
        revs.forEach(r => { stats[r.rating] = (stats[r.rating] || 0) + 1 })
        setRatingStats(stats)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    API.get(`/movies/${id}`).then(res => { if (res.data.status === 'success') setMovie(res.data.data) }).catch(err => console.error(err))
    fetchReviews()
  }, [id])

  const avgRating = reviews.length > 0 ? (reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1) : 0

  const handleEdit = (review) => {
    setEditingReview(review)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (review) => {
    if (!confirm('Delete your review?')) return
    try {
      await API.delete(`/reviews/${review.review_id}`, { data: { user_id: user.id } })
      fetchReviews()
    } catch (err) {
      console.error(err)
      alert('Failed to delete')
    }
  }

  if (!movie) return <Typography>Loading...</Typography>

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>{movie.title}</Typography>
          <Button color='inherit' onClick={() => navigate('/movies')}>Back</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt:4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p:2 }}>
              <img src={movie.image || movie.image_url || ''} alt={movie.title} style={{ width:'100%', borderRadius:8 }} />
              <Typography variant='h5' mt={2}>{movie.title}</Typography>
              <Typography color='text.secondary'>Year: {movie.release_year}</Typography>
              <Box mt={1}>
                <RatingStars value={avgRating} />
                <Typography>{avgRating} / 5 ({reviews.length} reviews)</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant='h6' gutterBottom>Rating Breakdown</Typography>
            {Object.entries(ratingStats).sort((a,b)=>b[0]-a[0]).map(([stars,count])=>(
              <Box key={stars} display='flex' alignItems='center' mb={1}>
                <Typography sx={{ width:50 }}>{stars}★</Typography>
                <LinearProgress variant='determinate' value={reviews.length ? (count/reviews.length)*100 : 0} sx={{ flex:1, mx:2 }} />
                <Typography>{count}</Typography>
              </Box>
            ))}
            <Divider sx={{ my:2 }} />
            <Typography variant='h6' gutterBottom>Reviews</Typography>
            <ReviewList reviews={reviews} user_id={user?.id} onEdit={handleEdit} onDelete={handleDelete} />
            {/* show form; if editingReview provided, pass it */}
            {auth.user ? (
              <ReviewForm movie_id={parseInt(id)} user_id={auth.user.id} existingReview={editingReview} onReviewAdded={fetchReviews} onCancelEdit={() => setEditingReview(null)} />
            ) : (
              <Typography>Please login to add or edit your review.</Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
