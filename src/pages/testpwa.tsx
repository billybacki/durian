import { useUpdateThemeMode } from '@/state/application/hooks'
import { Button, Container, Divider, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import usePwa from 'use-pwa'

const App: FC = () => {
  const { appinstalled, canInstallprompt, enabledA2hs, enabledPwa, isLoading, isPwa, showInstallPrompt, userChoice } =
    usePwa()
  const { toggleThemeMode } = useUpdateThemeMode()

  return (
    <Stack spacing={20} padding={20} alignItems={'center'}>
      <Typography variant="h1">PWA Page Test</Typography>
      <Container sx={{ padding: 20 }}>
        {enabledPwa && !isPwa ? (
          <Button variant="contained" disabled={appinstalled} onClick={showInstallPrompt}>
            Install Pwa
          </Button>
        ) : (
          <Typography variant="body1">Not compatible with pwa.</Typography>
        )}
        <hr />
        <Typography variant="body1">
          {`appinstalled: ${appinstalled}`}
          <br />
          {`canInstallprompt: ${canInstallprompt}`}
          <br />
          {`enabledA2hs: ${enabledA2hs}`}
          <br />
          {`enabledPwa: ${enabledPwa}`}
          <br />
          {`isLoading: ${isLoading}`}
          <br />
          {`isPwa: ${isPwa}`}
          <br />
          {`userChoice: ${JSON.stringify(userChoice)}`}
        </Typography>

        <Divider sx={{ my: 20 }} />

        <Button variant="contained" fullWidth onClick={toggleThemeMode}>
          ToggleThemeMode
        </Button>
      </Container>
    </Stack>
  )
}

export default App
