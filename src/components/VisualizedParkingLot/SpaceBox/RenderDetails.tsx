import { Box, Button, Paper, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import { useMemo, useState } from 'react'
import { Space } from '../../../redux/reducers/spaces'
import { Vehicle } from '../../../redux/reducers/vehicles'
import AddVehicleModal from './AddVehicleModal'
import RemoveVehicleModal from './RemoveVehicleModal'

const RenderDetails = ({
  color,
  spaceDetails,
  parkedCarDetails,
}: {
  color?: string
  spaceDetails?: Space
  parkedCarDetails?: Vehicle
}) => {
  const { title: spaceTitle, parkingType: spaceCategory } = useMemo(() => {
    if (spaceDetails) {
      const [firstWord, secondWord, parkingType] = spaceDetails?.type.split('-')
      return {
        title: `${firstWord} ${secondWord}`,
        parkingType,
      }
    }
    return {
      title: undefined,
      parkingType: undefined,
    }
  }, [spaceDetails])

  const [addVehicleModal, setAddVehicleModal] = useState<boolean>(false)
  const [checkoutVehicleModal, setCheckoutVehicleModal] =
    useState<boolean>(false)

  return (
    <>
      <Typography variant="body2">Space Type: </Typography>
      {spaceDetails ? (
        <div>
          {spaceCategory && (
            <Box
              component="strong"
              style={{
                textTransform: 'uppercase',
                color,
                border: `0.5px solid ${color}`,
                padding: '0 16px',
                marginRight: 8,
              }}
            >
              {spaceCategory}
            </Box>
          )}

          <span
            style={{
              textTransform: 'uppercase',
            }}
          >
            {spaceTitle}
          </span>
        </div>
      ) : (
        'Vacant Lot'
      )}
      <Box my={2}>
        <Typography variant="body2">ID: </Typography>
        <Typography fontWeight={700}>{spaceDetails?.id}</Typography>
      </Box>
      <Box my={2}>
        <Typography variant="body2">Vehicle: </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 1,
            mt: 1,
          }}
        >
          {parkedCarDetails ? (
            <>
              <Typography fontWeight={700} variant="body2">
                Vehicle ID
              </Typography>
              <Typography>{parkedCarDetails?.id}</Typography>
              <Box my={2} />
              <Typography fontWeight={700} variant="body2">
                Time In:{' '}
              </Typography>
              <Typography>
                {new Date(parkedCarDetails?.time_in).toString()}
              </Typography>

              <Box my={2} />

              <Button
                variant="contained"
                onClick={() => {
                  setCheckoutVehicleModal(true)
                }}
                fullWidth
                color="info"
              >
                OUT
              </Button>
              {checkoutVehicleModal && (
                <RemoveVehicleModal
                  open={checkoutVehicleModal}
                  onClose={() => {
                    setCheckoutVehicleModal(false)
                  }}
                  vehicle={parkedCarDetails}
                />
              )}
            </>
          ) : (
            <>
              <Typography
                textAlign="center"
                color={green['A400']}
                fontWeight={700}
              >
                VACANT
              </Typography>

              <Box my={2} />

              <Button
                variant="contained"
                onClick={() => {
                  setAddVehicleModal(true)
                }}
                fullWidth
                color="success"
              >
                ADD
              </Button>
              {addVehicleModal && (
                <AddVehicleModal
                  open={addVehicleModal}
                  onClose={() => {
                    setAddVehicleModal(false)
                  }}
                  space={spaceDetails!}
                />
              )}
            </>
          )}
        </Paper>
      </Box>
    </>
  )
}

export default RenderDetails
