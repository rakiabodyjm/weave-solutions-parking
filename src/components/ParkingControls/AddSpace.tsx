import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { nanoid } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import controls, {
  clearControls,
  ControlState,
  triggerAddSpaceMode,
} from '../../redux/reducers/controls'
import { addSpace, Space, SpaceType } from '../../redux/reducers/spaces'
import { RootState } from '../../redux/store'

export default function AddSpace() {
  const [addParking, setAddParking] = useState<SpaceType | string>('')

  const controlState = useSelector((state: RootState) => state.controls)

  const dispatch = useDispatch()
  return (
    <>
      <FormControl disabled={controlState.type === 'space'} fullWidth>
        <InputLabel id="space-label">Space Type:</InputLabel>

        <Select
          labelId="space-label"
          value={addParking}
          label="Space Type"
          onChange={(e: SelectChangeEvent) => {
            setAddParking(e.target.value)
          }}
        >
          {[
            'NONE',
            'entry-point',
            'parking-lot-sm',
            'parking-lot-md',
            'parking-lot-lg',
          ].map((choice, index) => (
            <MenuItem
              key={'space-selection-' + index}
              value={choice === 'NONE' ? '' : choice}
            >
              {choice?.split('-').join(' ').toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box my={2} />
      {controlState.type === null ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              if (addParking !== '') {
                dispatch(triggerAddSpaceMode(addParking as SpaceType))
              }
            }}
            disabled={!addParking}
          >
            CONFIRM
          </Button>
          <Typography variant="body2" color="textSecondary">
            You need to confirm first before going to "Add Space" Mode
          </Typography>
        </Box>
      ) : (
        <Box display="flex" justifyContent="space-between">
          <Button
            onClick={() => {
              dispatch(clearControls())
            }}
            variant="contained"
            color="error"
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // console.log(controlState)
              validateSpaceToBeAdded(controlState)
                .then((newSpace) => {
                  dispatch(addSpace(newSpace))
                  alert('Successfully Added new Space')
                  dispatch(clearControls())
                })
                .catch((err) => {
                  alert(err)
                })
            }}
            color="success"
          >
            CONFIRM
          </Button>
        </Box>
      )}
    </>
  )
}

async function validateSpaceToBeAdded(controlState: ControlState) {
  const maxLimits: Record<SpaceType, number> = {
    'entry-point': 4,
    'parking-lot-lg': 12,
    'parking-lot-md': 6,
    'parking-lot-sm': 2,
  }

  return new Promise<Space>((res, rej) => {
    if (!controlState['space_type']) {
      rej('No Control State')
    }
    if (
      maxLimits[controlState['space_type']!] !==
      controlState.coordinates?.length
    ) {
      rej(
        `Type: ${controlState['space_type']} must have ${
          maxLimits[controlState['space_type']!]
        } coordinates`
      )
    } else {
      // res('Succeeded')
      const cat = controlState['space_type']
        ?.split('-')
        .map((word) => word.charAt(0))
        .join('')
      res({
        id: `${cat}-${nanoid().slice(0, 4)}`,
        coords: controlState.coordinates,
        type: controlState.space_type,
      } as Space)
    }
  })
}
