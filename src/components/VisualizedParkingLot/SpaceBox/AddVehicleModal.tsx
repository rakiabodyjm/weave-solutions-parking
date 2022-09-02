import {
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Space } from '../../../redux/reducers/spaces'
import { addVehicle } from '../../../redux/reducers/vehicles'
import { RootState } from '../../../redux/store'

const modalStyles = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
}

const AddVehicleModal = ({
  open,
  onClose,
  space,
}: {
  open: boolean
  onClose: () => void
  space: Space
}) => {
  const checkouts = useSelector((state: RootState) => state.checkouts)
  const [vehicleId, setVehicleId] = useState<string | undefined>()
  const dispatch = useDispatch()
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          p: 2,
          ...modalStyles,
        }}
      >
        <Typography variant="h6">Add Vehicle</Typography>
        <Typography variant="body2">Assign vehicle to parking slot</Typography>

        <Divider
          sx={{
            my: 2,
          }}
        />
        <Box>
          <Typography variant="body2">Vehicle Plate Or ID:</Typography>

          <TextField
            variant="outlined"
            size="small"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setVehicleId(e.target.value)
            }}
            fullWidth
          />
          <Divider
            sx={{
              my: 2,
            }}
          />
          <Button
            onClick={() => {
              /**
               * Tackle returning after an hour
               */
              const sorted = [...checkouts]?.sort(
                (a, b) => a.time_out - b.time_out
              )
              // .find((checkout) => {
              //   if (Date.now() - checkout.time_out)
              //     checkout.time_out
              // })
              console.log(sorted)

              dispatch(
                addVehicle({
                  id: vehicleId!,
                  space: space.id,
                  time_in: Date.now(),
                })
              )
              onClose()
            }}
            disabled={!vehicleId || vehicleId.length === 0}
            fullWidth
            variant="contained"
          >
            ADD
          </Button>
        </Box>
      </Paper>
    </Modal>
  )
}

export default AddVehicleModal
