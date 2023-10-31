import { createContext, useEffect, useState} from "react";
const ChampionNamesContext = createContext();

const ChampionNamesProvider = (props) =>{
    const championNamesUpdate = (val) =>{
        setChampionNames(val);
    }

    const [championNames, setChampionNames] = useState([]);

    useEffect(() => {
        GetChampionNames(setChampionNames);
    }, []);

    return(
        <ChampionNamesContext.Provider value={{championNames, championNamesUpdate}}>
            {props.children}
        </ChampionNamesContext.Provider>
    );
}

const GetChampionNames = async (setChampionNames) => {
    try
    {
        let response = await fetch("https://localhost:5000/api/Game/names");

        if(response.ok !== true)
        {
            //setErrorMessage("Ooops something went wrong please try again later... 1");
            return;
        }
        let result = await response.json();

        setChampionNames(JSON.parse(JSON.stringify(result)));
    }
    catch(error)
    {
        console.log(error);
        //setErrorMessage("Ooops something went wrong please try again later... 1");
    }
}



export { ChampionNamesProvider, ChampionNamesContext };