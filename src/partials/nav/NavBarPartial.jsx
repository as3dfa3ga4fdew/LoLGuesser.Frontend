import "./NavBarPartial.css";
import '../../globals/Global.css';
import { NavLink } from "react-router-dom";
import Logo from '../../images/logo.png'

const NavBarPartial = () =>{
    return(
        <nav className="nav-header">
            <NavLink to="/" >
                <img src={Logo} alt="" className="header-logo"/>
            </NavLink>
            <div className="header-account-items">
                <NavLink className="header-item" to="/login" >Login</NavLink>
                <NavLink className="header-item" id="header-item-right" to="/register" >Register</NavLink>
            </div>
        </nav>
    );
}

export default NavBarPartial;