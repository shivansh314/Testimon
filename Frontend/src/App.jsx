import './App.css'
import { Outlet } from 'react-router-dom';
import Header from "./components/Header/Header.jsx"

function App() {

  return (
    <div className=" overflow-x-hidden scroll-smooth">
      <div className=" ">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App
