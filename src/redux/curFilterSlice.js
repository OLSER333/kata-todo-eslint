import { createSlice } from '@reduxjs/toolkit'

const curFilter = createSlice({
  name: 'curFilter',
  initialState: {
    curFilter: 'all',
  },
  reducers: {
    changeFilter(state, action) {
      state.curFilter = action.payload.newFilter
    },
  },
})

export default curFilter.reducer
export const { changeFilter } = curFilter.actions
