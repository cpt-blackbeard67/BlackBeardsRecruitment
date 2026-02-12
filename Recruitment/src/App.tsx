
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Valentine from './pages/valentine'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/valentine" element={<Valentine />} />
    </Routes>
  )
}