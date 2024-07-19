import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from '../slice/counterSlice'
import { loadingReducer } from '../slice/loadingSlice'
import { cartReducer } from '../slice/cartSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loading: loadingReducer,
    cart: cartReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
