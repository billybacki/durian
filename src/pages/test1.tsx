import routes from '@/constants/routes'
import { Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Test1() {
  return (
    <Container maxWidth="lg">
      <Stack spacing={20} padding={20} alignItems={'center'}>
        <Typography variant="h1">TITLE</Typography>
        <Link to={routes.test3} style={{ width: '100%' }}>
          <Button variant="contained" fullWidth>
            PWA Page
          </Button>
        </Link>
      </Stack>
    </Container>
  )
}
