import SubmitButton from '../../partials/buttons/SubmitButton';
import InputBox from '../../partials/inputs/InputBox';
import './Lore.css';

const handleButtonClick = () => {
  alert("Wallahi");
}

const Lore = () => {
  return(
    <div className='lore-container'>
      <div className='lore-window'>
        <p className='lore-title'>Which Champion has this Lore?</p>
        <div className='lore-question'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore dolore provident voluptatem nobis, aliquid soluta temporibus molestiae necessitatibus accusantium voluptates.</div>
      </div>
      <div className='lore-answer'>
        <InputBox />
        <SubmitButton onClick={handleButtonClick}/>
      </div>
    </div>
  );
}

export default Lore;