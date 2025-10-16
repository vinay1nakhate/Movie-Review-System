import { createSlice } from '@reduxjs/toolkit'

const initialState = { draft: {} }

const slice = createSlice({
  name: 'draftReview',
  initialState,
  reducers: {
    saveDraft: (state, action) => {
      const { movie_id, rating, comment } = action.payload
      state.draft[movie_id] = { rating, comment }
    },
    clearDraft: (state, action) => {
      delete state.draft[action.payload]
    }
  }
})

export const { saveDraft, clearDraft } = slice.actions
export default slice.reducer
