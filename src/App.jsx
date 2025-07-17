import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Home from './components/pages/home/Home'
import PageNotFound from './components/partials/PageNotFound'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<PageNotFound/>}></Route>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
