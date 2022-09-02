import { Paper, Typography, Box } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { useSelector } from 'react-redux'
import { Space } from '../../redux/reducers/spaces'
import { RootState } from '../../redux/store'

export default function ShowLotSummary() {
  const { vehicles, spaces } = useSelector((state: RootState) => state)
  const findVehicleInSpace = (space_id: Space['id']) => {
    return vehicles.find((vehicle) => vehicle.space === space_id)
  }
  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          p: 1,
          '& > *': {
            flexShrink: 0,
            textWrap: 'wrap',
            textAlign: 'center',
          },

          '& > :nth-child(1)': {
            flexBasis: '20%',
          },
          '& > :nth-child(2)': {
            flexBasis: '40%',
          },
          '& > :nth-child(3)': {
            flexBasis: '40%',
          },
        }}
        variant="outlined"
      >
        <Typography>Parking Lot</Typography>
        <Typography>Status</Typography>
        <Typography>Vehicle</Typography>
      </Paper>
      {spaces
        .filter((ea) => ea.type !== 'entry-point')
        .map((space) => (
          <Paper
            key={space.id}
            sx={{
              p: 0.5,
              display: 'flex',
              '& > *': {
                display: 'flex',
                justifyContent: 'center',
              },
              '& > :nth-child(1)': {
                flexBasis: '20%',
              },
              '& > :nth-child(2)': {
                flexBasis: '40%',
              },
              '& > :nth-child(3)': {
                flexBasis: '40%',
              },
            }}
            variant="outlined"
          >
            <Box>
              <Typography variant="body2" fontWeight={700}>
                {space.id}
              </Typography>
            </Box>

            <Box>
              <Circle vacant={!findVehicleInSpace(space.id)} />
            </Box>
            <Box>{findVehicleInSpace(space.id)?.id}</Box>
          </Paper>
        ))}
    </>
  )
}

const Circle = ({ vacant }: { vacant: boolean }) => {
  return (
    <Box
      style={{
        display: 'block',
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: vacant ? green['A400'] : red['A400'],
      }}
    ></Box>
  )
}
