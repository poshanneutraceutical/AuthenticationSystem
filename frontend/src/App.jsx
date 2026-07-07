import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerifyPage from './VerifyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/" element={
          <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
            <h2>Welcome to Ghost Strength Authentication</h2>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;