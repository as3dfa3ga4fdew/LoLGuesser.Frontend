import "./NavBarPartial.css";
import { NavLink } from "react-router-dom";

const NavBarPartial = () =>{
    return(
        <nav className="nav-header">
            <NavLink className="header-item" to="/" >LoL Guesser</NavLink>
            <NavLink className="header-item" to="/login" >Login</NavLink>
            <NavLink className="header-item" to="/register" >Register</NavLink>
        </nav>
    );
}

export default NavBarPartial;