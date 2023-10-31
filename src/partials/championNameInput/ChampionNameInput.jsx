import { ChampionNamesContext } from "../../contexts/ChampionNamesContext";
import { useContext, useRef, useState } from "react";
import './ChampionNameInput.css';

const ChampionNameInput = () => {

    const {championNamesUpdate, championNames} = useContext(ChampionNamesContext);
    const [championNameSuggestions, setChampionNameSuggestions] = useState([]);

    let championNameInputRef = useRef();

    const inputOnChange = () => {
        if(championNameInputRef.current.value === ""){
            setChampionNameSuggestions([]);
            return;
        }
            
        const filteredItems = championNames.filter(x => x.toLowerCase().startsWith(championNameInputRef.current.value.toLowerCase()));
        setChampionNameSuggestions(filteredItems);
    }

    const fillChampionName = (championName) => {
        championNameInputRef.current.value = championName;
        setChampionNameSuggestions([]);
    }

    return(
        <div className="champion-list-container">
        <input type="text" ref={championNameInputRef} onChange={inputOnChange} className="champion-name-input"/>
            <ul className="champion-list">
            {championNameSuggestions.map((championName) => (
                <ol className="champion-list-item" key={championName}>
                    <button className="champion-list-button" onClick={() => fillChampionName(championName)}>{championName}</button>
                </ol>
            ))}
            </ul>
        </div>
    )
}

export default ChampionNameInput;