import { Box, Paper } from '@mui/material'
import { blue, deepPurple, green, orange, red } from '@mui/material/colors'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCoordinates,
  removeCoordinates,
} from '../../../redux/reducers/controls'
import { Space, SpaceType } from '../../../redux/reducers/spaces'
import { Vehicle } from '../../../redux/reducers/vehicles'
import { RootState } from '../../../redux/store'
import RenderDetails from './RenderDetails'

const SpaceBox = ({
  x,
  y,
  type,
  cachedType,
}: {
  x: number
  y: number
  type?: Space
  cachedType?: Space['type']
}) => {
  const [bg, setBg] = useState<string | undefined>(undefined)

  /**
   * function to autogenerate bg according to space-type
   */
  const generateBg = (typeParam: typeof type | SpaceType) => {
    const spaceType = (typeParam as Space)?.type || typeParam
    switch (spaceType) {
      case 'entry-point': {
        return 'black'
      }
      case 'parking-lot-sm': {
        return orange['400']
      }
      case 'parking-lot-md': {
        return deepPurple['400']
      }
      case 'parking-lot-lg': {
        return blue['400']
      }
      default: {
        return undefined
      }
    }
  }

  const generatedBg = useMemo<ReturnType<typeof generateBg>>(
    () => generateBg(type || cachedType || undefined),
    [type, cachedType, generateBg]
  )

  const { controls, spaces, vehicles } = useSelector(
    (state: RootState) => state
  )

  const dispatch = useDispatch()

  const onClick = useCallback(() => {
    if (controls.type === 'space') {
      if (bg) {
        alert('Space already occupied')
      } else {
        /**
         * if coordinate is already occupied
         */
        if (
          controls.coordinates
            ?.map((ea) => ea.toString())
            .includes([x, y].toString())
        ) {
          dispatch(removeCoordinates([x, y]))
        } else {
          dispatch(addCoordinates([x, y]))
        }
      }
    }
  }, [controls.type, bg, controls.coordinates])

  /**
   *
   */

  useEffect(() => {
    setBg(generatedBg)
  }, [generatedBg])

  /**
   * supposedly computation for space and vehicle should be in useMemo but we ran
   * into hydration issues
   */
  const [space, setSpace] = useState<Space | undefined>()
  const [vehicle, setVehicle] = useState<Vehicle | undefined>()
  useEffect(() => {
    if (spaces) {
      setSpace(
        spaces.find((spc) => {
          return spc.coords.map((s) => s.toString()).includes([x, y].toString())
        })
      )
    }
  }, [spaces])

  useEffect(() => {
    if (vehicles && space) {
      setVehicle(
        vehicles.find((ve) => {
          return ve.space === space?.id
        })
      )
    }
  }, [vehicles, space])

  // const space = useMemo(
  //   () =>
  //     spaces.find((spc) => {
  //       return spc.coords.map((s) => s.toString()).includes([x, y].toString())
  //     }),
  //   [spaces]
  // )

  // const vehicle = useMemo(
  //   () =>
  //     vehicles.find((ve) => {
  //       return ve.space === space?.id
  //     }),
  //   [vehicles]
  // )

  return (
    <>
      <Box
        sx={{
          minWidth: 32,
          minHeight: 32,
          border: (theme) => {
            if (vehicle && space) {
              return `2px solid ${red['A400']}`
            }
            if (space && !vehicle && space.type !== 'entry-point') {
              return `2px solid ${green['A400']}`
            }
            return `1px solid ${theme.palette.divider}`
          },
          background: bg,
          position: 'relative',
          ...(controls.type === null &&
            bg && {
              ':hover': {
                '.hover': {
                  display: 'block',
                },
              },
            }),
        }}
        onClick={onClick}
      >
        <Paper
          className="hover"
          sx={{
            display: 'none',
            position: 'absolute',
            top: 16,
            zIndex: 1,
            p: 2,
            minWidth: 240,
            minHeight: 320,
          }}
        >
          {(space || vehicle) && (
            <RenderDetails
              spaceDetails={space}
              color={generatedBg}
              parkedCarDetails={vehicle}
            />
          )}
        </Paper>
      </Box>
    </>
  )
}

// export default memo(SpaceBox, (prevProps, nextProps) => {
//   return Object.values(prevProps).sort() === Object.values(nextProps).sort()
// })

export default SpaceBox
