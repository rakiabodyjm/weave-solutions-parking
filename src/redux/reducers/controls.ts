import { createSlice } from '@reduxjs/toolkit'
import { SpaceType } from './spaces'

export type ControlState = {
  type: null | 'space' | 'vehicle'
  space_type?: SpaceType
  coordinates?: number[][]
  selected_space_id?: string
}

let initialState: ControlState = {
  type: null,
}
const controlsSlice = createSlice({
  name: 'control-state',
  initialState: initialState,
  reducers: {
    triggerAddSpaceMode(
      _,
      action: {
        payload: SpaceType
      }
    ) {
      return {
        type: 'space',
        coordinates: [],
        space_type: action.payload,
      }
    },
    addCoordinates(
      state,
      action: {
        payload: [number, number]
      }
    ) {
      if (state) {
        return {
          ...(state as ControlState),
          coordinates: [
            ...((state as ControlState).coordinates || []),
            action.payload,
          ],
        }
      }
      return undefined
    },

    removeCoordinates(
      state,
      action: {
        payload: [number, number]
      }
    ) {
      const _state = state as ControlState
      return {
        ..._state,
        coordinates: _state.coordinates?.filter(
          (fi) => fi.toString() !== action.payload.toString()
        ),
      }
    },
    triggerAddVehicleMode() {
      return {
        type: 'vehicle',
        selected_space_id: undefined,
      }
    },

    addSpaceToVehicle(state, action: { payload: string }) {
      return {
        type: 'vehicle',
        selected_space_id: action.payload,
      }
    },
    clearControls() {
      return {
        type: null,
      }
    },
  },
})

export default controlsSlice.reducer

export const {
  addCoordinates,
  addSpaceToVehicle,
  clearControls,
  triggerAddSpaceMode,
  triggerAddVehicleMode,
  removeCoordinates,
} = controlsSlice.actions
