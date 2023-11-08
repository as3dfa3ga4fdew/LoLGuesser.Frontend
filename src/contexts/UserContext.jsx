import { createContext, useContext, useState, useEffect } from "react"
import config from "../config.json";

const UserContext = createContext();

const UserProvider = (props) => {

  const keyName = "user";
  const userBuilder = {jwt: "", username: "", score: 0, rememberMe: false};

  const userUpdate = (val) => {
    setUser(val);
  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    let value = JSON.parse(sessionStorage.getItem(keyName));

    if(value){
      setUser(value);
      return;
    }

    value = JSON.parse(localStorage.getItem(keyName));

    if(!value){
      setUser(userBuilder);
      return;
    }

    SetValidatedUserAsync(value.jwt, setUser, value, userBuilder);

  }, []);

  useEffect(() => {
    if(user === null)
      return;

    sessionStorage.setItem(keyName, JSON.stringify(user));

    if(user.rememberMe === false){
      localStorage.removeItem(keyName);
      return;
    }

    localStorage.setItem(keyName, JSON.stringify(user));

  }, [user]);

  return(
    <UserContext.Provider value={{user, userUpdate}}>
      {props.children}
    </UserContext.Provider>
  );
}

const SetValidatedUserAsync = async (jwt, setUser, value, userBuilder) => {
  try{
    let response = await fetch(config.serverUrl + "/api/auth/token", {
      headers: {
        Authorization: "Bearer " + jwt
      }
    });

    if(response.ok !== true){
      setUser(userBuilder);
      return;
    }
  }
  catch(error){
    setUser(userBuilder);
    console.log(error);
  }

  setUser(value);
  return;
}


export { UserProvider, UserContext}