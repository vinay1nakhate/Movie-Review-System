import React, { useState } from 'react'
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/api'
import { useDispatch } from 'react-redux'
import { setAuth } from '../features/authSlice'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/users/login', { email, password })
      if (res.data.status === 'success') {
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        dispatch(setAuth({ token, user }))
        navigate('/movies')
      } else {
        alert(res.data.error)
      }
    } catch (err) {
      console.error(err)
      alert('Login failed')
    }
  }

  return (
    <Container maxWidth='xs' sx={{ mt:10 }}>
      <Paper sx={{ p:4 }}>
        <Typography variant='h5' align='center' gutterBottom>Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField label='Email' fullWidth margin='normal' value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label='Password' fullWidth type='password' margin='normal' value={password} onChange={e => setPassword(e.target.value)} />
          <Button fullWidth variant='contained' sx={{ mt:2 }} type='submit'>Login</Button>
        </form>
        <Typography variant='body2' align='center' sx={{ mt:2 }}>Don’t have an account? <Link to='/register'>Register</Link></Typography>
      </Paper>
    </Container>
  )
}
