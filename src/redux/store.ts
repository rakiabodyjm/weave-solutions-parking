import { configureStore } from '@reduxjs/toolkit'
import spaces from './reducers/spaces'
import vehicles from './reducers/vehicles'
import controls from './reducers/controls'
import checkouts from './reducers/checkouts'
import rates from './reducers/rates'

const makeStore = () =>
  configureStore({
    reducer: {
      spaces: spaces,
      vehicles: vehicles,
      controls: controls,
      checkouts: checkouts,
      rates: rates,
    },
  })

const store = makeStore()

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// export const wrapper = createWrapper<ReturnType<typeof makeStore>>(makeStore);
export function getLocalStorageParsed(
  key: 'redux' | string,
  subKey?: string | keyof RootState
) {
  if (process.browser && window && window?.localStorage) {
    let mainLocalStorageDataGet = window.localStorage.getItem(key)
    const mainLocalStorageData = JSON.parse(
      mainLocalStorageDataGet!
    ) as RootState

    return subKey
      ? mainLocalStorageData?.[subKey as keyof RootState]
      : mainLocalStorageData || undefined
  } else {
  }
}

export const defaultState = {
  spaces: [
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
    {
      id: 'pls-XeaL',
      coords: [
        [8, 2],
        [9, 2],
      ],
      type: 'parking-lot-sm',
    },
    {
      id: 'pls-G5UZ',
      coords: [
        [8, 4],
        [9, 4],
      ],
      type: 'parking-lot-sm',
    },
    {
      id: 'pls-pRrR',
      coords: [
        [8, 6],
        [9, 6],
      ],
      type: 'parking-lot-sm',
    },
    {
      id: 'pls-y5Z3',
      coords: [
        [0, 5],
        [1, 5],
      ],
      type: 'parking-lot-sm',
    },
    {
      id: 'pls-Kt1-',
      coords: [
        [0, 3],
        [1, 3],
      ],
      type: 'parking-lot-sm',
    },
    {
      id: 'plm-zen9',
      coords: [
        [7, 9],
        [9, 9],
        [8, 9],
        [7, 10],
        [8, 10],
        [9, 10],
      ],
      type: 'parking-lot-md',
    },
    {
      id: 'pll-3w-w',
      coords: [
        [0, 12],
        [0, 13],
        [0, 14],
        [1, 14],
        [2, 14],
        [3, 14],
        [3, 13],
        [2, 13],
        [1, 13],
        [1, 12],
        [2, 12],
        [3, 12],
      ],
      type: 'parking-lot-lg',
    },
  ],
  vehicles: [
    { id: 'ABC123', time_in: 1662086704567, space: 'pls-1' },
    { id: 'UIU700', space: 'pls-pRrR', time_in: 1662092239831 },
    { id: 'JMT100', space: 'plm-zen9', time_in: 1662096059604 },
    { id: 'JMT200', space: 'pll-3w-w', time_in: 1662102804341 },
  ],
  controls: { type: null },
  checkouts: [],
  rates: { 'parking-lot-lg': 100, 'parking-lot-md': 60, 'parking-lot-sm': 20 },
}
