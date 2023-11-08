import "./RegisterPage.css";
import "../../globals/Global.css";
import { useRef, useState, useContext } from "react";
import { IsValidUsername, isValidPassword } from "../../helpers/ValidateInput";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";

const RegisterPage = () => {
    const navigation = useNavigate();
    const {userUpdate, user} = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState(null);

    let usernameRef = useRef();
    let passwordRef = useRef();

    const [rememberMe, setRememberMe] = useState(false);
    const rememberMeHandler = () => {
        setRememberMe(!rememberMe);
    }

    const register = async () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if(!IsValidUsername(username)){
            setErrorMessage("Invalid Username");
            return;
        }
        if(!isValidPassword(password)){
            setErrorMessage("Invalid Password");
            return;
        }

        try{
            let response;
            let result;

            response = await fetch(config.serverUrl + "/api/auth/register", {
                method: "post",
                headers: {
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if(response.ok !== true){
                if(response.status === 409){
                    setErrorMessage("Username already exists");
                    return;
                }
                return;
            }

            result = await response.json();

            setErrorMessage("success");

            let userBuilder = {
                jwt: result.jwt,
                username: result.username,
                score: result.score,
                rememberMe: rememberMe
            };

            userUpdate(userBuilder);
            console.log(userBuilder);
            navigation("/");
        }
        catch(error){
            console.error(error);
            setErrorMessage("Something went wrong");
            return;
        }
    }

    return(
    
    <div className="register-container">
        <div className="register-window">
            <div className="register-credentials">

                <div className="register-input-container">
                    <label className="register-input-label">Username</label>
                    <input className='register-input' type="text" ref={usernameRef} />
                </div>
                <div className="register-input-container">
                    <label className="register-input-label">Password</label>
                    <input className='register-input' type="password" ref={passwordRef} />
                </div>

                <div className="register-rememberme">Remember Me
                    <input type="checkbox" className="register-rememberme-text" onChange={rememberMeHandler} checked={rememberMe} />
                </div>
                <div className="error-container">
                    <p>{errorMessage == null ? "" : errorMessage}</p>
                </div>
                <button className="register-button" onClick={register}>Register</button>
            </div>
            
        </div>
    </div>

    )
}

export default RegisterPage;