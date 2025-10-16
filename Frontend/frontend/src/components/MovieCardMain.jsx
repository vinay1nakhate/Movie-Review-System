import React from 'react'
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'

export default function MovieCardMain({ movie }) {
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
        <Button component={Link} to={`/movie/${movie.movie_id}`} variant='contained' fullWidth sx={{ mt: 2 }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}
