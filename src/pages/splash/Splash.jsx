import SubmitButton from '../../partials/buttons/SubmitButton';
import ChampionNameInput from '../../partials/championNameInput/ChampionNameInput';
import InputBox from '../../partials/inputs/InputBox';
import './Splash.css'

const handleButtonClick = () => {
  alert("Splash button clicked");
}

const Splash = ({image}) => {
  return(
    <div className='splash-container'>
      <div className='splash-window'>
        <p className='splash-title'>Which Champion has this Splash Art?</p>
        <div className='splash-img-container'>
          <img className='splash-img' src={image} alt="testbild" />
        </div>
      </div>
      <div className='splash-answer'>
        <ChampionNameInput />
        <SubmitButton onClick={handleButtonClick}/>
      </div>
    </div>
  );
}

export default Splash;