import './App.css'
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div >
      <div className='overflow-x-hidden'>
        
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App
