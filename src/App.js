import { Route, Routes } from 'react-router-dom';
import './App.css';
import Routing from './pages/Routing';
import NavBarPartial from './partials/nav/NavBarPartial';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';

function App() {
  return (
    <>
      <NavBarPartial/>
      <Routing />
    </>
  );
}

export default App;
