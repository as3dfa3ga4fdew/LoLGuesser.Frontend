import { NavLink } from "react-router-dom";
import "./HomePage.css";

const HomePage = () =>{
    return(
        <div className="home-container">
            <div className="home-window">
                <div className="home-title">Choose blyad</div>
                <div className="home-items">
                    <NavLink to='/ability' className="home-item">Ability</NavLink>
                    <NavLink to='/lore' className="home-item">Lore</NavLink>
                    <NavLink to='/splash' className="home-item">Splash</NavLink>
                </div>
            </div>
        </div>
    );
}

export default HomePage;