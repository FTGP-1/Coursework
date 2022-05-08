import React from 'react';
import './App.css';
import MetaMask from './Components/MetaMask';
import Findtransaction from './Components/Findtransaction';

function App() {
  return (
    <React.Fragment>
      <Findtransaction />
      <MetaMask />
    </React.Fragment>
  );
}

export default App;
