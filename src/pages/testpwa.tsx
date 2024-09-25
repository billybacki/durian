import { Button, Container, Typography } from '@mui/material'
import { FC } from 'react'
import usePwa from 'use-pwa'

const App: FC = () => {
  const { appinstalled, canInstallprompt, enabledA2hs, enabledPwa, isLoading, isPwa, showInstallPrompt, userChoice } =
    usePwa()

  return (
    <Container sx={{ padding: 20 }}>
      {enabledPwa && !isPwa ? (
        <Button variant="contained" disabled={!canInstallprompt || appinstalled} onClick={showInstallPrompt}>
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
    </Container>
  )
}

export default App
