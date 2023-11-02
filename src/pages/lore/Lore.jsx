import { useEffect, useState } from 'react';
import ChampionNameInput from '../../partials/championNameInput/ChampionNameInput';
import './Lore.css';

const Lore = () => {

  const [question, setQuestion] = useState({});
  
  useEffect(() => {
    SetQuestionAsync(setQuestion);
  }, [])

  return(
    <div className='lore-container'>
      <div className='lore-window'>
        <p className='lore-title'>Which Champion has this Lore?</p>
        <div className='lore-question'>"{question.value}"</div>
      </div>
      <div className='lore-answer'>
        <ChampionNameInput />
      </div>
    </div>
  );
}

const SetQuestionAsync = async (setQuestion) => {
  try 
  {
    let body = {
      "type": 0
    };

    let response = await fetch("https://localhost:5000/api/Game/question", {
      method: "post",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if(response.ok !== true)
    {
      //setErrorMessage("Ooops something went wrong please try again later... 1");
      return;
    }
    let result = await response.json();
    console.log(result);
    setQuestion(JSON.parse(JSON.stringify(result)));
  }
  catch(error)
  {
    console.log(error);
    //setErrorMessage("Ooops something went wrong please try again later... 1");
  }
}

export default Lore;