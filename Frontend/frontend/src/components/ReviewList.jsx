import React from 'react'
import { Paper, Typography, Box, IconButton } from '@mui/material'
import RatingStars from './RatingStars'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ReviewList({ reviews, user_id, onEdit, onDelete }) {
  const userReview = reviews.find(r => r.user_id === user_id)
  const otherReviews = reviews.filter(r => r.user_id !== user_id)
  const sorted = userReview ? [userReview, ...otherReviews] : reviews

  return (
    <Box mt={2}>
      {sorted.map(r => (
        <Paper key={r.review_id} sx={{ p:2, mb:2, backgroundColor: r.user_id === user_id ? 'rgba(25,118,210,0.05)' : '#fff' }} elevation={2}>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='subtitle1'>{r.reviewer_name}</Typography>
            <Box display='flex' alignItems='center'>
              <RatingStars value={r.rating} />
              {r.user_id === user_id && (
                <>
                  <IconButton size='small' onClick={() => onEdit(r)} aria-label='edit'>
                    <EditIcon fontSize='small' />
                  </IconButton>
                  <IconButton size='small' onClick={() => onDelete(r)} aria-label='delete'>
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>
          <Typography variant='body2' color='text.secondary' mt={1}>{r.comment}</Typography>
          <Typography variant='caption' color='text.secondary'>{new Date(r.review_date).toLocaleString()}</Typography>
        </Paper>
      ))}
    </Box>
  )
}
