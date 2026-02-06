import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import WinCredit from './pages/WinCredit'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="win-credit" element={<WinCredit />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
