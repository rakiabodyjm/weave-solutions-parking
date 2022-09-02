import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SyntheticEvent, useState } from 'react'
import AddSpace from './AddSpace'
import ShowLotSummary from './ShowLotSummary'
import ParkingRate from './ParkingRate'

export default function ParkingControls() {
  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <div>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Parking Status
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            View Lot Status
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ShowLotSummary />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Add Space
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Add Entry Points or Parking Spaces
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddSpace />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Parking Rates
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Modify or Add Parking Rates
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ParkingRate />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
