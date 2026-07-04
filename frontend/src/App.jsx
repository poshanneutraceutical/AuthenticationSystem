import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerifyPage from './VerifyPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* This matches the URL inside your QR code */}
        <Route path="/verify/:qrId" element={<VerifyPage />} />
      </Routes>
    </Router>
  );
}

export default App;