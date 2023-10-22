import "./NavBarPartial.css";
import { NavLink } from "react-router-dom";

const NavBarPartial = () =>{
    return(
        <nav>
            <NavLink to="/">LoL Guesser</NavLink>
        </nav>
    );
}

export default NavBarPartial;