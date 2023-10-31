import './InputBox.css';

const InputBox = ({labelText, placeholderText}) => {

  return(
    <div className="input-container">
      <label className="input-label">{labelText}</label>
      <input className='input-input' type="text" />
    </div>
  );
}

export default InputBox;