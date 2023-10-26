import SubmitButton from '../../partials/buttons/SubmitButton';
import InputBox from '../../partials/inputs/InputBox';
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
        <InputBox />
        <SubmitButton onClick={handleButtonClick}/>
      </div>
    </div>
  );
}

export default Ability