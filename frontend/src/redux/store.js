import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import userReducer from './userSlice.js'
import videoReducer from './videoSlice.js'
import themeReducer from './themeSlice.js'
import pauseHistoryReducer from './pauseHistorySlice.js'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer= combineReducers({
  user: userReducer, 
  video: videoReducer, 
  theme: themeReducer,
  pauseHistory: pauseHistoryReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)