import { Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";

//Routes paths
const Routing = () => {
    return(
        <Routes>
            <Route path='/' element={<HomePage/>}/>
        </Routes>
    );
}

export default Routing;