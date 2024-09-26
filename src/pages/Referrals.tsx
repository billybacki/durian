import { Box, Stack, Typography } from '@mui/material'

export default function Referrals() {
  return (
    <Box width={'100%'}>
      <Stack gap={8} sx={{ padding: '0 24px 16px', borderBottom: '1px solid var(--ps-color-300)' }}>
        <Typography variant="body2" color={'var(--ps-color-500)'}>
          Total Referrals
        </Typography>
        <Typography variant="h3">42</Typography>
      </Stack>
      <Stack></Stack>
    </Box>
  )
}
