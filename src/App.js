import { Route, Routes } from 'react-router-dom';
import './App.css';
import Routing from './pages/Routing';
import NavBarPartial from './partials/nav/NavBarPartial';
import {ChampionNamesProvider} from './contexts/ChampionNamesContext';

function App() {
  return (
    <>
    <ChampionNamesProvider>
      <NavBarPartial/>
      <Routing />
    </ChampionNamesProvider>
    </>
  );
}

export default App;
