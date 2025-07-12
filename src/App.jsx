import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import ShortenerForm from './components/ShortenerForm';
import RedirectPage from './components/RedirectPage';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<ShortenerForm />} />
          <Route path="/:shortcode" element={<RedirectPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
