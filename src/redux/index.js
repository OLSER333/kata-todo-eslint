import { combineReducers, configureStore } from '@reduxjs/toolkit'

import todosSlice from './todosSlice'
import curFilterSlice from './curFilterSlice'

const rootReducer = combineReducers({
  toolkit: todosSlice,
  curFilter: curFilterSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})
