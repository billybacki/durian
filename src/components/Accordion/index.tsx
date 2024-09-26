import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
// import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { FontSize } from '@/themes'
interface Props {
  summary: string | JSX.Element
  details: string | JSX.Element
  expanded: boolean
  onChange: () => void
}

export default function _Accordion(props: Props) {
  const { summary, details, onChange, expanded } = props

  return (
    <Accordion
      onChange={onChange}
      sx={{
        boxShadow: 'none',
        '& .MuiAccordionSummary-content': {
          margin: '1.25rem 0'
        }
      }}
      expanded={expanded}
    >
      <AccordionSummary
        sx={{ fontSize: { xs: FontSize.f14, md: FontSize.f16 } }}
        expandIcon={expanded ? <RemoveIcon sx={{ color: '#929292' }} /> : <AddIcon sx={{ color: '#929292' }} />}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails>{details}</AccordionDetails>
    </Accordion>
  )
}
