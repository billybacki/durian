import { Container, Stack, Typography } from '@mui/material'
import TestPwa from './testpwa'

export default function Test1() {
  return (
    <Container maxWidth="lg">
      <Stack spacing={20} padding={20} alignItems={'center'}>
        <Typography variant="h1">PWA Page Test</Typography>
        <TestPwa />
      </Stack>
    </Container>
  )
}
