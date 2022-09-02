import { createSlice } from '@reduxjs/toolkit'

export type Checkout = {
  id: string
  vehicle: string
  space_id: string
  time_in: number
  time_out: number

  computed_hours: number
  rounded_hours: number
  parking_lot_rate: number
  hour_24_rate?: number

  total_amount: number
}
const initialState: Checkout[] = []

export const checkoutSlice = createSlice({
  initialState,
  name: 'checkouts',
  reducers: {
    addCheckout(state, action: { payload: Checkout }) {
      return [...state, action.payload]
    },
    setCheckouts(_, action: { payload: Checkout[] }) {
      return action.payload
    },
  },
})

export default checkoutSlice.reducer
export const { addCheckout, setCheckouts } = checkoutSlice.actions
