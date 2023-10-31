import { ChampionNamesContext } from "../../contexts/ChampionNamesContext";
import { useContext, useRef, useState } from "react";
import './ChampionNameInput.css';

const ChampionNameInput = () => {

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

    const fillChampionName = (championName) => {
        championNameInputRef.current.value = championName;
        setChampionNameSuggestions([]);
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
            setSuggestionIndex(suggestionIndex - 1);
            championNameSuggestions[suggestionIndex].isSelected = false;
            championNameSuggestions[suggestionIndex - 1].isSelected = true;
        }
        if(e.key === "ArrowDown"){
            setSuggestionIndex(suggestionIndex + 1);
            championNameSuggestions[suggestionIndex].isSelected = false;
            championNameSuggestions[suggestionIndex + 1].isSelected = true;
        }

        setChampionNameSuggestions(JSON.parse(JSON.stringify(championNameSuggestions)));

        console.log(e.key);
    }

    return(
        <div className="champion-list-container" onKeyDown={onKeyPress}>
            <input type="text" ref={championNameInputRef} onChange={inputOnChange} className="champion-name-input"/>
            <ul className="champion-list">
                {championNameSuggestions.map((championName) => {

                    if(championName.isSelected)
                        return <ol className="champion-list-item champion-name-highlight" key={championName.championName}>{championName.championName}</ol>;
                    else
                        return <ol className="champion-list-item" key={championName.championName}>{championName.championName}</ol>;

                })}
            </ul>
        </div>
    )
}

export default ChampionNameInput;