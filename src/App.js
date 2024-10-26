import './App.css'
import Admin from './components/Admin'
import Editor from './components/Editor'
import Home from './components/Home'
import Layout from './components/Layout'
import LinkPage from './components/LinkPage'
import Login from './components/Login'
import Lounge from './components/Lounge'
import Missing from './components/Missing'
import Register from './components/Register'
import Unauthorized from './components/Unauthorized'
import { Routes, Route } from 'react-router-dom'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public route */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='lingpage' element={<LinkPage />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path='/' element={<Home />} />
          <Route path='editor' element={<Editor />} />
          <Route path='admin' element={<Admin />} />
          <Route path='lounge' element={<Lounge />} />
        </Route>
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
