import React from 'react'
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import RatingStars from './RatingStars'

export default function MovieCard({ movie }) {
  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
      <CardMedia component='img' height='200' image={movie.image || movie.image_url || ''} alt={movie.title} />
      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {movie.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Year: {movie.release_year || movie.release_year}
        </Typography>
        <Box display='flex' alignItems='center' mt={1}>
          <RatingStars value={movie.avg_rating || movie.avg_rating} />
          <Typography variant='body2' sx={{ ml: 1 }}>
            {movie.avg_rating ? Number(movie.avg_rating).toFixed(1) : 'No rating'}
          </Typography>
        </Box>
        <Button component={Link} to={`/movie/${movie.movie_id}`} variant='contained' fullWidth sx={{ mt: 2 }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}
