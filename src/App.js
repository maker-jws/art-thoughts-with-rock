import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from './Components/MainContainer/index'
import Navbar from './Components/Navbar/index'
import FooterNav from './Components/FooterNav/index'


function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="App-main"><MainContainer /></main>
      <FooterNav />
    </div>
  );
}

export default App;
