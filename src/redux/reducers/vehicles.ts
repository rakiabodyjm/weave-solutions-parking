import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorageParsed } from '../store'
import { Space } from './spaces'

export type Vehicle = {
  id: string
  time_in: number
  space: Space['id']
}

const initialState: Vehicle[] = [
  {
    id: 'ABC123',
    time_in: Date.now(),
    space: 'pls-1',
  },
]

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    addVehicle(
      state,
      action: {
        payload: Vehicle
      }
    ) {
      return [...state, action.payload]
    },

    removeVehicle(state, action: { payload: string }) {
      return [...state].filter((vehicle) => vehicle.id !== action.payload)
    },
    setVehicles(_, action: { payload: Vehicle[] }) {
      return action.payload
    },
  },
})

export default vehicleSlice.reducer
export const { addVehicle, removeVehicle, setVehicles } = vehicleSlice.actions
