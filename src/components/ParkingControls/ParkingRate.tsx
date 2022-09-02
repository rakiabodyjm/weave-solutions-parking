import { Box, Stack, TextField, Typography } from '@mui/material'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRate } from '../../redux/reducers/rates'
import { SpaceType } from '../../redux/reducers/spaces'
import { RootState } from '../../redux/store'

export default function ParkingRate() {
  const rates = useSelector((state: RootState) => state.rates)
  const dispatch = useDispatch()

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>()

  const debouncedOnChange = (id: SpaceType, amount: number) => {
    if (timeoutRef.current) {
      clearTimeout()
      timeoutRef.current = setTimeout(() => {
        dispatch(
          setRate({
            key: id as SpaceType,
            amount: Number(amount),
          })
        )
      }, 500)
    }
  }
  return (
    <Stack spacing={2}>
      {[
        {
          name: 'Small Parking Lot',
          id: 'parking-lot-sm',
        },
        {
          name: 'Medium Parking Lot',
          id: 'parking-lot-md',
        },
        {
          name: 'Large Parking Lot',
          id: 'parking-lot-lg',
        },
      ].map(({ id, name }) => (
        <Box
          key={id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              display: 'inline',
            }}
            variant="body1"
          >
            {name}
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            type="number"
            onChange={(e) => {
              debouncedOnChange(id as SpaceType, Number(e.target.value))
            }}
            defaultValue={rates[id as keyof typeof rates]}
          />
        </Box>
      ))}
    </Stack>
  )
}
