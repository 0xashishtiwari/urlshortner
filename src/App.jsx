import React from 'react';


import './App.css'; // Import global styles
import Navbar from './components/Navbar';
import ShortenerForm from './components/ShortenerForm';

function App() {
  return (
    <>
      <Navbar/>
      <div className="container">
      <ShortenerForm/>
      </div>
    </>
  );
}

export default App;
