import { useEffect, useState } from 'react';
import ChampionNameInput from '../../partials/championNameInput/ChampionNameInput';
import './Splash.css';
import '../../globals/Global.css';


const Splash = () => {
  
  const [question, setQuestion] = useState({});
  const [randomCoordinates, setRandomCoordinates] = useState({ randomX: 0, randomY: 0 });
  const [next, setNext] = useState(false);

  useEffect(() => {
    SetQuestionAsync(setQuestion);
    setRandomCoordinates(getRandomCoordinates(1215, 717, 250, 250));
  }, [next])
  
  return(
    <div className='splash-container'>
      <div className='splash-window'>
        <p className='splash-title'>Which Champion has this Splash Art?</p>
        <div className='splash-img-container'>
          <div 
            className='splash-img' 
            style={{
              backgroundImage: `url(${question.value})`,
              backgroundPosition: `-${randomCoordinates.randomX}px -${randomCoordinates.randomY}px`
            }}
          ></div> 
        </div>
      </div>
      <div className='splash-answer'>
        <ChampionNameInput id={question.id} type={question.type} setNext={setNext} next={next} />
      </div>
    </div>
  );
};

function getRandomCoordinates(imageWidth, imageHeight, cropWidth, cropHeight){
  const maxWidth = imageWidth - cropWidth;
  const maxHeight = imageHeight - cropHeight;

  const randomX = Math.floor(Math.random() * maxWidth);
  const randomY = Math.floor(Math.random() * maxHeight);

  return { randomX, randomY }
}

const SetQuestionAsync = async (setQuestion) => {
  try 
  {
    let body = {
      "type": 2
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

export default Splash;