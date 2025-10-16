import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, AppBar, Toolbar, Button } from '@mui/material'
import API from '../api/api'
import MovieCardMain from '../components/MovieCardMain'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearAuth } from '../features/authSlice'

export default function Movies() {
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    API.get('/movies').then(res => {
      if (res.data.status === 'success') setMovies(res.data.data)
    }).catch(err => console.error(err))
  }, [])
  

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(clearAuth())
    navigate('/')
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>Movies</Typography>
          <Button color='inherit' onClick={() => navigate('/movies')}>Home</Button>
          <Button color='inherit' onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt:4 }}>
        <Typography variant='h4' gutterBottom>Movie List</Typography>
        <Grid container spacing={2}>
          {movies.map(movie => (
            <Grid item xs={12} sm={6} md={4} key={movie.movie_id}>
              <MovieCardMain movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
