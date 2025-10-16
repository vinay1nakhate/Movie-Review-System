import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import draftReviewReducer from '../features/draftReviewSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  auth: authReducer,
  draftReview: draftReviewReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'draftReview'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }),
})

const persistor = persistStore(store)

export default { store, persistor }
