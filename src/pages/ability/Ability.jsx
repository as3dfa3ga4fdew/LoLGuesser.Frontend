import SubmitButton from '../../partials/buttons/SubmitButton';
import ChampionNameInput from '../../partials/championNameInput/ChampionNameInput';
import './Ability.css';

const handleButtonClick = () => {
  alert("button clicked!")
}

const Ability = ({image}) => {
  return(
    <div className='ability-container'>
      <div className='ability-window'>
        <p className='ability-title'>Which Champion has this Ability?</p>
        <div className='ability-img-container'>
          <img className='ability-img' src={image} alt="testbild" />
        </div>
      </div>
      <div className='ability-answer'>
        <ChampionNameInput />
        <SubmitButton onClick={handleButtonClick}/>
      </div>
    </div>
  );
}

export default Ability