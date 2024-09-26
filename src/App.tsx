import { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import routes from './constants/routes'
import Test1 from './pages/test1'
import BetPage from './pages/betPage'
import PwaPage from './pages/testpwa'
import ChartPage from './pages/chartPage'
import Verify from './pages/verify'

function App() {
  useEffect(() => {
    const loader = document.querySelector('.app-loader')
    if (loader) {
      loader.classList.add('app-loader-hidden')
      setTimeout(() => {
        loader.classList.add('app-loader-none')
      }, 300)
    }
  }, [])

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={routes.index} element={<PwaPage />} />
        <Route path={routes.components} element={<Test1 />} />
        <Route path={routes.betPage} element={<BetPage />} />
        <Route path={routes.chartPage} element={<ChartPage />} />
        <Route path={routes.verify} element={<Verify />} />
        <Route path="*" element={<Navigate to={routes.index} replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
