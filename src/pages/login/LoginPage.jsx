import "./LoginPage.css";
import "../../globals/Global.css";
import { useRef, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import config from "../../config.json";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const navigation = useNavigate();
    const { userUpdate, user } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState(null);

    let usernameRef = useRef();
    let passwordRef = useRef();

    const login = async () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        try{
            let response;
            let result;

            response = await fetch(config.serverUrl + "/api/auth/login", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if(response.ok !== true){
                if(response.status === 401){
                    setErrorMessage("Invalid username or password");
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
                rememberMe: false
            };

            userUpdate(userBuilder);
            console.log(userBuilder);
            navigation("/");
        }
        catch{
            setErrorMessage("Something went wrong");
            return;
        }
    };

    return(
        <div className="login-container">
            <div className="login-window">
                <div className="login-credentials">
                    <div className="login-input-container">
                        <label className="login-input-label">Username</label>
                        <input className='login-input' type="text" ref={usernameRef} />
                    </div>
                    <div className="login-input-container">
                        <label className="login-input-label">Password</label>
                        <input className='login-input' type="password" ref={passwordRef} />
                    </div>
                        <div className="error-container">
                            <p>{errorMessage == null ? "" : errorMessage}</p>
                        </div>
                    <button className="login-button" onClick={login}>Log in</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;