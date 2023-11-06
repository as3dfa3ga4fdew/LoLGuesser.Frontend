import { Route, Routes } from 'react-router-dom';
import './App.css';
import Routing from './pages/Routing';
import NavBarPartial from './partials/nav/NavBarPartial';
import {ChampionNamesProvider} from './contexts/ChampionNamesContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <>
    <UserProvider>
      <ChampionNamesProvider>
        <NavBarPartial/>
        <Routing />
      </ChampionNamesProvider>
    </UserProvider>
    </>
  );
}

export default App;
