import {
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { nanoid } from '@reduxjs/toolkit'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCheckout } from '../../../redux/reducers/checkouts'
import { Space } from '../../../redux/reducers/spaces'
import { removeVehicle, Vehicle } from '../../../redux/reducers/vehicles'
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
const RemoveVehicleModal = ({
  open,
  onClose,
  vehicle,
}: {
  open: boolean
  onClose: () => void
  vehicle: Vehicle
}) => {
  const { spaces, rates } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  const [spaceOccupiedByVehicle, setSpaceOccupiedByVehicle] = useState<
    undefined | Space
  >()
  /**
   * done by useEffect and useState just incase we have another hydration issue
   */
  useEffect(() => {
    if (spaces) {
      setSpaceOccupiedByVehicle(spaces.find((fi) => fi.id === vehicle.space))
    }
  }, [spaces])

  useMemo(() => {
    if (spaceOccupiedByVehicle) {
      const { id } = spaceOccupiedByVehicle
      const [] = id.split('-')
    }
  }, [spaceOccupiedByVehicle])

  const [times, setTimes] = useState({
    time_in: new Date(vehicle.time_in),
    time_out: new Date(Date.now()),
  })

  const totalHours = useMemo(() => {
    return (
      Number(
        (
          (times.time_out.getTime() - times.time_in.getTime()) *
          2.77778e-7
        ).toFixed(2)
      ) || 0
    )
  }, [times.time_out, times.time_in])

  const rate = useMemo(() => {
    if (rates && spaceOccupiedByVehicle) {
      return rates[spaceOccupiedByVehicle?.type]
    }
  }, [rates, spaceOccupiedByVehicle])

  const roundedHours = useMemo(() => {
    if (totalHours) {
      return Math.ceil(Number(totalHours))
    }
  }, [totalHours])

  const [had24hours, setHad24hours] = useState<number | undefined>(undefined)

  const totalRate = useMemo(() => {
    let hour24 = 0
    const totalNonRoundedHours = Number(totalHours)

    if (totalNonRoundedHours / 24 > 1) {
      hour24 += Math.floor(totalNonRoundedHours / 24)
    }

    setHad24hours(hour24 === 0 ? undefined : hour24)
    const compute = Number(roundedHours) * Number(rate) - hour24 * 24
    return compute
  }, [roundedHours, rate, totalHours])

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Paper
          sx={{
            p: 2,
            ...modalStyles,
          }}
        >
          <Typography variant="h6">Checkout Vehicle</Typography>
          <Typography variant="body2">
            Checkout Vehicle going out of parking space
          </Typography>

          <Divider
            sx={{
              my: 2,
            }}
          />
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2">Vehicle ID:</Typography>
              <Typography fontWeight={700}>{vehicle.id}</Typography>
            </Box>
            <Box>
              <Typography variant="body2">Time In:</Typography>
              <TextField
                defaultValue={dateToISOLikeButLocal(new Date(vehicle.time_in))}
                type="datetime-local"
                fullWidth
                size="small"
                onChange={(va) => {
                  setTimes((prev) => ({
                    ...prev,
                    time_in: new Date(va.target.value),
                  }))
                }}
                // disabled
              />
            </Box>

            <Box>
              <Typography variant="body2">Time Out:</Typography>
              <TextField
                defaultValue={dateToISOLikeButLocal(new Date(Date.now()))}
                type="datetime-local"
                fullWidth
                size="small"
                onChange={(va) => {
                  setTimes((prev) => ({
                    ...prev,
                    time_out: new Date(va.target.value),
                  }))
                }}
              />
            </Box>

            <Paper variant="outlined">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > *': {
                    flexGrow: 1,
                  },
                }}
                p={2}
              >
                <Box>
                  <Typography variant="body2">Rate:</Typography>
                  <Typography fontWeight={700}>{rate} / hr</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Hours:</Typography>
                  <Typography fontWeight={700}>
                    {Number(totalHours) > 0 ? totalHours : 'Invalid'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Rounded Hours:</Typography>
                  <Typography fontWeight={700}>
                    {Number(roundedHours) > 0 ? roundedHours : 'Invalid'}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > *': {
                    flexGrow: 1,
                  },
                }}
                p={2}
              >
                <Box>
                  <Typography variant="body2">Hour Rate Today:</Typography>
                  <Typography fontWeight={700}>
                    {Number(totalRate) > 0 ? totalRate : 'Invalid'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2">24 Hour Rates:</Typography>
                  <Typography fontWeight={700}>
                    {had24hours ? had24hours : 'NA'}
                  </Typography>
                </Box>
              </Box>
              <Box p={2}>
                <Typography variant="body2">Total Rate:</Typography>
                <Typography fontWeight={700}>
                  {had24hours
                    ? totalRate + had24hours * 5000
                    : Number(totalRate) > 0
                    ? totalRate
                    : 'Invalid'}
                </Typography>
              </Box>
            </Paper>
          </Stack>

          <Divider
            sx={{
              my: 2,
            }}
          />
          <Button
            onClick={() => {
              if (
                (times.time_in,
                times.time_out,
                totalHours,
                roundedHours,
                rate,
                vehicle,
                spaceOccupiedByVehicle)
              ) {
                dispatch(
                  addCheckout({
                    time_in: times.time_in.getTime(),
                    time_out: times.time_out.getTime(),
                    computed_hours: Number(totalHours),
                    rounded_hours: Number(roundedHours),
                    parking_lot_rate: rate!,
                    id: `co-${nanoid().slice(0, 4)}`,
                    vehicle: vehicle.id,
                    space_id: spaceOccupiedByVehicle?.id,
                    hour_24_rate: had24hours
                      ? totalRate + had24hours * 5000
                      : undefined,
                    total_amount: totalRate + (had24hours || 0) * 5000,
                  })
                )
                dispatch(removeVehicle(vehicle.id))
                onClose()
              } else {
                console.log()
              }
            }}
            fullWidth
            variant="contained"
          >
            Checkout
          </Button>
        </Paper>
      </Modal>
    </>
  )
}

function dateToISOLikeButLocal(date: Date) {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000
  const msLocal = date.getTime() - offsetMs
  const dateLocal = new Date(msLocal)
  const iso = dateLocal.toISOString()
  const isoLocal = iso.slice(0, 19)
  return isoLocal
}
export default RemoveVehicleModal
