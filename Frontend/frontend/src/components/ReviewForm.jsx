import React, { useState, useEffect } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import RatingStars from './RatingStars'
import { useDispatch, useSelector } from 'react-redux'
import { saveDraft, clearDraft } from '../features/draftReviewSlice'
import API from '../api/api'

export default function ReviewForm({ movie_id, user_id, existingReview, onReviewAdded, onCancelEdit }) {
  const dispatch = useDispatch()
  const draft = useSelector(state => state.draftReview.draft[movie_id])
  const [rating, setRating] = useState(draft?.rating || existingReview?.rating || 0)
  const [comment, setComment] = useState(draft?.comment || existingReview?.comment || '')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (draft) {
      setRating(draft.rating)
      setComment(draft.comment)
    }
    if (existingReview) {
      setRating(existingReview.rating)
      setComment(existingReview.comment)
    }
  }, [draft, existingReview])

  const handleSaveDraft = () => {
    dispatch(saveDraft({ movie_id, rating, comment }))
    alert('Draft saved locally')
  }

  const handleSubmit = async () => {
    if (!rating || !comment) {
      alert('Please provide both rating and comment')
      return
    }
    try {
      setLoading(true)
      if (existingReview) {
        await API.put(`/reviews/${existingReview.review_id}`, { user_id, rating, comment })
      } else {
        await API.post('/reviews', { movie_id, user_id, rating, comment })
      }
      dispatch(clearDraft(movie_id))
      onReviewAdded()
      setRating(0)
      setComment('')
      if (onCancelEdit) onCancelEdit()
      alert('Review submitted')
    } catch (err) {
      console.error(err)
      alert(err?.response?.data?.error || 'Failed to submit review')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!existingReview) return
    if (!confirm('Delete your review?')) return
    try {
      await API.delete(`/reviews/${existingReview.review_id}`, { data: { user_id } })
      dispatch(clearDraft(movie_id))
      onReviewAdded()
      if (onCancelEdit) onCancelEdit()
    } catch (err) {
      console.error(err)
      alert('Failed to delete review')
    }
  }

  return (
    <Box sx={{ mt:3 }}>
      <Typography variant='h6' gutterBottom>{existingReview ? 'Edit Your Review' : 'Add Your Review'}</Typography>
      <RatingStars value={rating} onChange={(_, value) => setRating(value)} readOnly={false} size='medium' />
      <TextField fullWidth multiline rows={3} margin='normal' label='Your comment' value={comment} onChange={e => setComment(e.target.value)} />
      <Box display='flex' gap={2}>
        <Button variant='outlined' onClick={handleSaveDraft} disabled={!rating && !comment}>Save as Draft</Button>
        <Button variant='contained' onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting...' : (existingReview ? 'Update' : 'Submit')}</Button>
        {existingReview && <Button variant='text' color='error' onClick={handleDelete}>Delete</Button>}
        {existingReview && <Button variant='text' onClick={onCancelEdit}>Cancel</Button>}
      </Box>
      {draft && <Typography variant='caption' color='text.secondary' sx={{ mt:1, display:'block' }}>Draft saved for this movie.</Typography>}
    </Box>
  )
}
