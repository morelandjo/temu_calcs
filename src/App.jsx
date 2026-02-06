import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import WinCredit from './pages/WinCredit'
import ClaimCredit from './pages/ClaimCredit'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="win-credit" element={<WinCredit />} />
          <Route path="claim-credit" element={<ClaimCredit />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
