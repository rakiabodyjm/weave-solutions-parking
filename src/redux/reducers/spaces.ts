import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorageParsed } from '../store'

export type SpaceType =
  | 'entry-point'
  | 'parking-lot-sm'
  | 'parking-lot-md'
  | 'parking-lot-lg'

export type Space = {
  id: string
  type: SpaceType
  coords: number[][]
}

const initialState: Space[] = [
  {
    id: 'ep-1',
    type: 'entry-point',
    coords: [
      [3, 2],
      [4, 2],
    ],
  },
  {
    id: 'pls-1',
    type: 'parking-lot-sm',
    coords: [
      [0, 7],
      [1, 7],
    ],
  },
]

const spaceSlice = createSlice({
  name: 'spaces',
  initialState,
  reducers: {
    addSpace(
      state,
      action: {
        payload: Space
      }
    ) {
      return [...state, action.payload]
    },
    removeSpace(
      state,
      action: {
        payload: string
      }
    ) {
      return [...state].filter((space) => space.id !== action.payload)
    },
    setSpaces(_, action: { payload: Space[] }) {
      return action.payload
    },
    setRate(
      state,
      {
        payload: { id, rate },
      }: {
        payload: {
          id: string
          rate: number
        }
      }
    ) {
      return [
        ...state,
        {
          ...[...state].find((space) => space.id === id),
          rate,
        },
      ] as Space[]
    },
  },
})

const validateAddSpace = (updatedState: Space[], addSpace: Space) => {}

export const { addSpace, removeSpace, setSpaces } = spaceSlice.actions
export default spaceSlice.reducer
