import { Route, Routes } from 'react-router-dom';
import './App.css';
import Routing from './pages/Routing';
import NavBarPartial from './partials/nav/NavBarPartial';

function App() {
  return (
    <>
      <NavBarPartial/>
      <Routing />
    </>
  );
}

export default App;
