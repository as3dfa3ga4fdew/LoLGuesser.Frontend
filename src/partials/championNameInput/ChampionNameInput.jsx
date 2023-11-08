import { ChampionNamesContext } from "../../contexts/ChampionNamesContext";
import {UserContext} from "../../contexts/UserContext";
import { useContext, useRef, useState } from "react";
import './ChampionNameInput.css';
import '../../globals/Global.css';
import config from "../../config.json";

const ChampionNameInput = ({id, type, setNext, next}) => {
    const {userUpdate, user} = useContext(UserContext);
    const [message, setMessage] = useState(null);
    const {championNamesUpdate, championNames} = useContext(ChampionNamesContext);
    const [championNameSuggestions, setChampionNameSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(-1);
    const [incorrectInputs, setIncorrectInputs] = useState([]);
    let championNameInputRef = useRef();

    const inputOnChange = () => {
        if(championNameInputRef.current.value === ""){
            setChampionNameSuggestions([]);
            setSuggestionIndex(-1);
            return;
        }
        
        const filteredItems = championNames.filter(x => x.toLowerCase().startsWith(championNameInputRef.current.value.toLowerCase()))
            .map((championName) => {
                return {"championName": championName, "isSelected": false};
            });

        if(filteredItems.length >= 1){
            setSuggestionIndex(0);
            filteredItems[0].isSelected = true;
        }
        else
            setSuggestionIndex(-1);

        setChampionNameSuggestions(filteredItems);
    }

    const onKeyPress = async (e) => {
    
        if(e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== 'Enter')
            return;
        if(championNameSuggestions.length === 0)
            return;
        
        if(e.key === "ArrowUp" && suggestionIndex === 0)
            return;
        if(e.key === "ArrowDown" && suggestionIndex === championNameSuggestions.length -1)
            return;
        
        if(e.key === "ArrowUp"){
            championNameSuggestions[suggestionIndex].isSelected = false;
            championNameSuggestions[suggestionIndex - 1].isSelected = true;

            const element = document.getElementById(championNameSuggestions[suggestionIndex - 1].championName);
            element.scrollIntoView();
            setSuggestionIndex(suggestionIndex - 1);
        }
        if(e.key === "ArrowDown"){
            championNameSuggestions[suggestionIndex].isSelected = false;
            championNameSuggestions[suggestionIndex + 1].isSelected = true;

            const element = document.getElementById(championNameSuggestions[suggestionIndex + 1].championName);
            element.scrollIntoView();
            setSuggestionIndex(suggestionIndex + 1);
        }

        if(e.key === "Enter"){
            const selectedChampionName = championNameSuggestions[suggestionIndex].championName;
            setChampionNameSuggestions([]);
            setSuggestionIndex(-1);

            let body = {
                "id" : id,
                "type" : type,
                "answer" : selectedChampionName
            }

            let result = await validateAnswer2(user.jwt, body, setMessage);
            
            if(result.correct !== true)
            {

                if(!incorrectInputs.includes(selectedChampionName)){
                    setIncorrectInputs([selectedChampionName, ...incorrectInputs]);
                }
                championNameInputRef.current.value = "";
                return;
            }
            else{
                setIncorrectInputs([]);
            }
            
            if(user.jwt !== "")
            {
                console.log(result);
                user.score = result.score;
                userUpdate(JSON.parse(JSON.stringify(user)));
            }
            
            setMessage(null);
            setNext(!next);

            championNameInputRef.current.value = "";

            return;
        }
    }

    return(
        <div className="champion-list-container" onKeyDown={onKeyPress}>
            <input type="text" ref={championNameInputRef} onChange={inputOnChange} className="champion-name-input"/>
            <ul className="champion-list">
                {championNameSuggestions.map((championName) => {
                    return <ol id={championName.championName} className={championName.isSelected ? "champion-list-item champion-name-highlight" : "champion-list-item"} key={championName.championName}>{championName.championName}</ol>;
                })}
            </ul>
                <ul className="incorrect-input-list">
                    {incorrectInputs.map((input, index) => (
                        <li className="incorrect-item" key={index}>{input}</li>
                    ))}
                </ul>
            
        </div>
    )
}

const validateAnswer2 = async (jwt, body, setMessage) => {
    try
    {
        //Update to /api/game/answer later will work the same
        let response = await fetch(config.serverUrl + "/api/Game/answer", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                 Authorization: jwt === "" ? "" : "Bearer " + jwt
            },
            body: JSON.stringify(body)
        });

        if(response.ok !== true)
        {
            setMessage("Ooops something went wrong please try again later...");
            return;
        }

        return response.json().then((responseJson)=>{return responseJson});
    }
    catch(e)
    {
        setMessage("Ooops something went wrong please try again later...");
        return;
    }
}

export default ChampionNameInput;