import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import { useSelector } from 'react-redux'

function PrivateRoute({ children }) {
  const auth = useSelector(state => state.auth)
  if (!auth?.token) return <Navigate to='/' replace />
  return children
}

export default function App(){
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/movies' element={
        <PrivateRoute><Movies /></PrivateRoute>
      } />
      <Route path='/movie/:id' element={
        <PrivateRoute><MovieDetails /></PrivateRoute>
      } />
    </Routes>
  )
}