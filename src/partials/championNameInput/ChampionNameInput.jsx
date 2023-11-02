import { ChampionNamesContext } from "../../contexts/ChampionNamesContext";
import { useContext, useRef, useState } from "react";
import './ChampionNameInput.css';

const ChampionNameInput = ({id, type}) => {

    const {championNamesUpdate, championNames} = useContext(ChampionNamesContext);
    const [championNameSuggestions, setChampionNameSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(-1);
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
            console.log(suggestionIndex);
            console.log(filteredItems[0]);
            filteredItems[0].isSelected = true;
        }
        else
            setSuggestionIndex(-1);

        setChampionNameSuggestions(filteredItems);
    }

    const onKeyPress = (e) => {
    
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
            championNameInputRef.current.value = selectedChampionName;
            
            //Send answer to API
            //id, type, answer
            return;
        }
        setChampionNameSuggestions(JSON.parse(JSON.stringify(championNameSuggestions)));
    }

    return(
        <div className="champion-list-container" onKeyDown={onKeyPress}>
            <input type="text" ref={championNameInputRef} onChange={inputOnChange} className="champion-name-input"/>
            <ul className="champion-list">
                {championNameSuggestions.map((championName) => {
                    return <ol id={championName.championName} className={championName.isSelected ? "champion-list-item champion-name-highlight" : "champion-list-item"} key={championName.championName}>{championName.championName}</ol>;
                })}
            </ul>
        </div>
    )
}

export default ChampionNameInput;