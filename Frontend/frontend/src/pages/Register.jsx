import React, { useState } from 'react'
import { TextField, Button, Container, Typography, Paper } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/api'

export default function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/users/registration', form)
      if (res.data.status === 'success') navigate('/')
      else alert(res.data.error)
    } catch (err) {
      console.error(err)
      alert('Registration failed')
    }
  }

  return (
    <Container maxWidth='xs' sx={{ mt:10 }}>
      <Paper sx={{ p:4 }}>
        <Typography variant='h5' align='center' gutterBottom>Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField name='firstName' label='First name' fullWidth margin='normal' onChange={handleChange} />
          <TextField name='lastName' label='Last name' fullWidth margin='normal' onChange={handleChange} />
          <TextField name='email' label='Email' fullWidth margin='normal' onChange={handleChange} />
          <TextField name='password' type='password' label='Password' fullWidth margin='normal' onChange={handleChange} />
          <Button fullWidth variant='contained' sx={{ mt:2 }} type='submit'>Register</Button>
        </form>
        <Typography variant='body2' align='center' sx={{ mt:2 }}>Already have an account? <Link to='/'>Login</Link></Typography>
      </Paper>
    </Container>
  )
}
