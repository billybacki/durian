import Input from '@/components/Input'
import routes from '@/constants/routes'
import { useUpdateThemeMode } from '@/state/application/hooks'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import SweetButton from '@/components/Button/SweetButton'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import BitterButton from '@/components/Button/BitterButton'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SelectButton from '@/components/Button/SelectButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function Test1() {
  const { toggleThemeMode } = useUpdateThemeMode()
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const empty = true
  return (
    <Container maxWidth="lg">
      <Stack spacing={20} alignItems={'center'}>
        <Box>------ Typography Start ------</Box>
        <Typography variant="caption">caption-96-1.2</Typography>
        <Typography variant="h1">h1-60-1</Typography>
        <Typography variant="h2">h2-28-1.4</Typography>
        <Typography variant="h3">h3-24-1.2</Typography>
        <Typography variant="h4">h4-22-1.4</Typography>
        <Typography variant="h5">h5-18-1</Typography>
        <Typography variant="h6">h6-16-1</Typography>
        <Typography variant="body1">body1-14-1.6</Typography>
        <Typography variant="body2">body2-12-1.4</Typography>
        <Typography variant="subtitle1">subtitle1-18-1.4</Typography>
        <Typography variant="subtitle2">subtitle2-14-1.2</Typography>
        <Box>------ Typography End ------</Box>
        <Box>------ Button Start ------</Box>
        <Box display={'flex'} gap={8}>
          <Button variant="contained">contained</Button>
          <Button variant="contained" disabled>
            contained
          </Button>
        </Box>
        <Box display={'flex'} gap={8}>
          <Button variant="outlined">outlined</Button>
          <Button variant="outlined" disabled>
            outlined
          </Button>
        </Box>
        <Box display={'flex'} gap={8}>
          <Button variant="contained" size="small">
            small
          </Button>
          <Button variant="contained" size="small" disabled>
            small
          </Button>
        </Box>
        <Box display={'flex'} gap={8}>
          <Button variant="text">text</Button>
          <Button variant="text" disabled>
            text
          </Button>
        </Box>
        <Box display={'flex'} gap={8}>
          <SweetButton variant="contained" endIcon={<ArrowDropDownIcon />}>
            contained
          </SweetButton>
          <SweetButton variant="contained" disabled>
            contained
          </SweetButton>
        </Box>
        <Box display={'flex'} gap={8}>
          <SweetButton variant="outlined">outlined</SweetButton>
          <SweetButton variant="outlined" disabled>
            outlined
          </SweetButton>
        </Box>
        <Box display={'flex'} gap={8}>
          <BitterButton variant="contained" endIcon={<ArrowDropDownIcon />}>
            contained
          </BitterButton>
          <BitterButton variant="contained" disabled>
            contained
          </BitterButton>
        </Box>
        <Box display={'flex'} gap={8}>
          <BitterButton variant="outlined">outlined</BitterButton>
          <BitterButton variant="outlined" disabled>
            outlined
          </BitterButton>
        </Box>
        <Box display={'flex'} gap={8} width={'100%'}>
          <SelectButton
            empty={empty}
            fullWidth
            endIcon={
              <Box display={'flex'} alignItems={'center'}>
                <Typography variant="h6" color={'var(--ps-color-500)'}>
                  Select Network
                </Typography>
                <ExpandMoreIcon></ExpandMoreIcon>
              </Box>
            }
          >
            value
          </SelectButton>
        </Box>
        <Box>------ Button End ------</Box>
        <Box>------ Input Start ------</Box>
        <Input value={value} onChange={e => setValue(e.target.value)} placeholder="text" />
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="text"
          endAdornment={<VisibilityIcon />}
        />
        <Box>------ Input End ------</Box>
        <Button variant={'outlined'} onClick={() => toggleThemeMode()}>
          <span>toggle theme</span>
        </Button>
        <Button variant={'outlined'} onClick={() => navigate(routes.betPage)}>
          To Bet Page
        </Button>

        <Button variant={'outlined'} onClick={() => navigate(routes.chartPage)}>
          To Chart Page
        </Button>

        <Button variant={'outlined'} onClick={() => navigate(routes.verify)}>
          To Verify Page
        </Button>
      </Stack>
    </Container>
  )
}
