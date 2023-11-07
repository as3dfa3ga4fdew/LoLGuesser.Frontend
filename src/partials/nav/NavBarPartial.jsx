import "./NavBarPartial.css";
import '../../globals/Global.css';
import { NavLink } from "react-router-dom";
import Logo from '../../images/logo.png'
import {UserContext} from "../../contexts/UserContext";
import { useContext } from "react";
const NavBarPartial = () =>{
    const {userUpdate, user} = useContext(UserContext);

    const logout = () =>{
        userUpdate({jwt: "", username: "", score: 0, rememberMe: false});
    }

    return(
        <nav className="nav-header">
            <NavLink to="/" >
                <img src={Logo} alt="company logo" className="header-logo"/>
            </NavLink>
            {
                user == null || user.jwt == "" ? 
                <div className="header-account-items">
                    <NavLink className="header-item" to="/login" >Login</NavLink>
                    <NavLink className="header-item" id="header-item-right" to="/register" >Register</NavLink>
                </div>
                :
                <div>
                    <button onClick={logout}>Logout</button>
                    <p>{user.username}</p>
                    <p>{user.score}</p>
                </div>
            }
          
        </nav>
    );
}

export default NavBarPartial;