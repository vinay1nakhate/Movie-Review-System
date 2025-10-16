import React from 'react'
import { Rating } from '@mui/material'

export default function RatingStars({ value, onChange, readOnly = true, size = 'small' }) {
  return (
    <Rating
      name='star-rating'
      value={Number(value) || 0}
      precision={1}
      readOnly={readOnly}
      onChange={onChange}
      size={size}
    />
  )
}
