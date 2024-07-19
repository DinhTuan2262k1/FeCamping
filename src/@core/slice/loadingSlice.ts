import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../utils/store'

interface LoadingState {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: false,
}

export const loadingSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    show: (state) => {
      state.isLoading = true
    },
    close: (state) => {
      state.isLoading = false
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
    toggle: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { show, close, toggle } = loadingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export const loadingReducer = loadingSlice.reducer
export default loadingSlice.reducer
