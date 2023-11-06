import { useEffect, useState } from 'react';
import ChampionNameInput from '../../partials/championNameInput/ChampionNameInput';
import './Ability.css';
import '../../globals/Global.css';


const Ability = () => {

  const [question, setQuestion] = useState({});
  const [next, setNext] = useState(false);

  useEffect(() => {
    SetQuestionAsync(setQuestion);
  }, [next]);

  return(
    <div className='ability-container'>
      <div className='ability-window'>
        <div className='ability-title'>Which Champion has this Ability?</div>
        <div className='ability-img-container'>
          <img className='ability-img' src={question.value} alt="testbild" />
        </div>
      </div>
      <div className='ability-answer'>
        <ChampionNameInput id={question.id} type={question.type} setNext={setNext} next={next} />
      </div>
    </div>
  );
}

const SetQuestionAsync = async (setQuestion) => {
  try 
  {
    let body = {
      "type": 1
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

export default Ability;