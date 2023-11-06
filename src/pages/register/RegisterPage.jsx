import "./RegisterPage.css";
import AccountButton from "../../partials/buttons/AccountButton";
import InputBox from "../../partials/inputs/InputBox";
import { useRef, useState, useContext } from "react";
import { IsValidUsername, isValidPassword } from "../../helpers/ValidateInput";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
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

            const token = result.jwt;
            const decoded = jwtDecode(token);

            let userBuilder = {
                jwt: result.jwt,
                username: decoded.username,
                score: result.score,
                rememberMe: rememberMe
            };

            userUpdate(userBuilder);

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
                <InputBox labelText="Användarnamn" ref={usernameRef} />
                <InputBox labelText="Lösenord" ref={passwordRef} />
                <p>Remember Me</p>
                <input type="checkbox" onChange={rememberMeHandler} checked={rememberMe}/>
                <div className="error-container">
                    <p>{errorMessage == null ? "" : errorMessage}</p>
                </div>
                <AccountButton text="Registrera" onClick={() => register()}/>
            </div>
            
        </div>
    </div>

    )
}

export default RegisterPage;