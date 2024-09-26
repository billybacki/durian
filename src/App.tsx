import { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import routes from './constants/routes'
import Test1 from './pages/test1'
import PwaPage from './pages/testpwa'
import ComingSoon from './components/ComingSoon'

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
        <Route path={routes.test1} element={<Test1 />} />
        <Route path={routes.test2} element={<ComingSoon />} />
        <Route path="*" element={<Navigate to={routes.index} replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
