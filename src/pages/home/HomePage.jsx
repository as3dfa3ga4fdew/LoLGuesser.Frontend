import { NavLink } from "react-router-dom";
import "./HomePage.css";
import '../../globals/Global.css';
import abilityImage from '../../images/ability.png';
import loreImage from '../../images/lore.png';
import splashImage from '../../images/splash.png';

const HomePage = () =>{
    return(
        <div className="home-container">
            <div className="home-window">
                <div className="home-items-wrapper">
                    <div className="home-titles">
                        <div className="home-title">Ability</div>
                        <div className="home-title">Lore</div>
                        <div className="home-title">Splash Art</div>
                    </div>

                    <div className="home-items">
                        <NavLink to='/ability' className="home-item">
                            <img src={abilityImage} alt="ability" className="lore-image" />
                        </NavLink>
                        <NavLink to='/lore' className="home-item">
                            <img src={loreImage} alt="lore" className="lore-image"/>
                        </NavLink>
                        <NavLink to='/splash' className="home-item">
                            <img src={splashImage} alt="splash" className="lore-image" />
                        </NavLink>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default HomePage;