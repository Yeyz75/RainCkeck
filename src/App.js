import React from 'react';
import './App.css';
import LocationSearch from './components/LocationSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>RainCheck</h1>
        <p>La mejor manera de verificar el clima en tiempo real</p>
        <LocationSearch />
      </header>
      <footer>
        <p>Hecho con amor por Yeyzon</p>
      </footer>
    </div>
  );
}

export default App;
