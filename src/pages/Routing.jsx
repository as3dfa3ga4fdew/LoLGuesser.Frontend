import { Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import LoginPage from "./login/LoginPage";
import RegisterPage from "./register/RegisterPage";
import Ability from "./ability/Ability";
import Lore from "./lore/Lore";
import Splash from "./splash/Splash";
import {ChampionNamesProvider} from '../contexts/ChampionNamesContext';

//Routes paths
const Routing = () => {
    return(
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/ability' element={<Ability />} />
            <Route path='/lore' element={<Lore />} />
            <Route path='/splash' element={<Splash />} />
        </Routes>
    );
}

export default Routing;