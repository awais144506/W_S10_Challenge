import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './userApi'
import OrderReducer from './orderSlice'
const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
    Orders:OrderReducer,
    // add your reducer(s) here
    [userApi.reducerPath]:userApi.reducer
  },
  middleware: getDefault => getDefault().concat(
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
    userApi.middleware
  ),
})

export const store = resetStore()
