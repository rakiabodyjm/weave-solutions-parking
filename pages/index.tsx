import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Button, Divider, Paper } from '@mui/material'
import ParkingControls from '../src/components/ParkingControls'
import VisualizedParkingLot from '../src/components/VisualizedParkingLot'
import { Save } from '@mui/icons-material'
import store from '../src/redux/store'

const Home: NextPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
          <Typography variant="h4">Weave Solutions Parking Lot</Typography>
          <Typography variant="caption">
            Made with TypeScript, React, Next.js, Redux, Material-UI v5
          </Typography>
        </Box>

        <Box>
          <Paper
            sx={{
              p: 2,
            }}
            variant="outlined"
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">Controls</Typography>
              <Button
                variant="contained"
                endIcon={<Save />}
                onClick={() => {
                  window.localStorage.setItem(
                    'redux',
                    JSON.stringify(store.getState())
                  )
                  alert('Data saved to localStorage')
                }}
              >
                Save
              </Button>
            </Box>

            <Divider
              sx={{
                my: 2,
              }}
            />

            <ParkingControls />
          </Paper>
        </Box>
        <Box
          sx={{
            margin: 'auto',
            width: 'max-content',
            p: 2,
            mt: 4,
          }}
        >
          <VisualizedParkingLot />
        </Box>
      </Box>
    </Container>
  )
}

export default Home
