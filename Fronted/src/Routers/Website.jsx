import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Component/Website/Pages/HomePage'

const Website = () => {
  return (
    <>
    <Routes>
      <Route path='' element={<HomePage/>} />
    </Routes>
    </>
  )
}

export default Website