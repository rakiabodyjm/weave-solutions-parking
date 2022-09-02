import { Menu, Paper, Popover } from '@mui/material'
import { blue, deepPurple, red } from '@mui/material/colors'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux'
import { Space } from '../../redux/reducers/spaces'
import { RootState } from '../../redux/store'
import SpaceBox from './SpaceBox'

const squareX = 10
const squareY = 50

export default function VisualizedParkingLot() {
  const state = useSelector((state: RootState) => state)
  const { spaces, controls } = state
  /**
   *
   * function to check if space is already in control form and return space_type
   */
  const getTypeFromCache = (x: number, y: number) => {
    if (controls.coordinates && controls.coordinates.length > 0) {
      // if(arToString(controls.coordinates).)
      if (
        controls.coordinates
          .map((ea) => ea.toString())
          .includes([x, y].toString())
      ) {
        return controls.space_type
      }
    }
  }

  /**
   * function to get type of space from redux state and return space_type
   */

  const getType = (x: number, y: number): Space | undefined => {
    let found: Space | undefined = undefined
    spaces.forEach((space) => {
      if (
        space.coords
          .map((coord) => coord.toString())
          .includes([x, y].toString())
      ) {
        found = space
      }
    })
    return found
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        {[...Array(squareX)].map((ea, xIndex) => (
          <Box
            sx={{
              position: 'relative',
              ':after': {
                content: `"${xIndex}"`,
                position: 'absolute',
                top: -24,
                left: 12,
              },
            }}
            key={xIndex}
          >
            {[...Array(squareY)].map((_, yIndex) => (
              <Box
                sx={{
                  ...(xIndex === squareX - 1 && {
                    position: 'relative',
                    ':after': {
                      content: `"${yIndex}"`,
                      position: 'absolute',
                      top: 4,
                      right: -24,
                    },
                  }),
                }}
                key={`${xIndex}${yIndex}`}
              >
                <SpaceBox
                  x={xIndex}
                  y={yIndex}
                  type={getType(xIndex, yIndex)}
                  cachedType={getTypeFromCache(xIndex, yIndex)}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </>
  )
}

// const MemoizedSpace = memo(Space, (prevProp, nextProp) => {
//   return (
//     Object.values(prevProp).toString() === Object.values(nextProp).toString()
//   );
// });
