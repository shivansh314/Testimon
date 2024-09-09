import { useState } from 'react'

import './App.css'
import SignUp from './components/SignUp.jsx'
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div >
      <div>
        
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App
