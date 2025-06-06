import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Website from './Routers/Website';
import Admin from './Routers/Admin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Website />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
