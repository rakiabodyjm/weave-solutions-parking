import { createSlice } from '@reduxjs/toolkit'
import { SpaceType } from './spaces'

const initialState: Partial<Record<SpaceType, number>> = {
  'parking-lot-lg': 100,
  'parking-lot-md': 60,
  'parking-lot-sm': 20,
}

export type Rates = typeof initialState
const rateSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setRate(
      state,
      {
        payload: { key, amount },
      }: {
        payload: {
          key: keyof typeof initialState
          amount: number
        }
      }
    ) {
      return {
        ...state,
        [key]: amount,
      }
    },
    setRates(_, { payload }: { payload: typeof initialState }) {
      return payload
    },
  },
})

export const { setRate, setRates } = rateSlice.actions
export default rateSlice.reducer
