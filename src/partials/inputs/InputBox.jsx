import './InputBox.css';
const InputBox = ({ labelText, placeholderText, onChange }) => {
  return (
    <div className="input-container">
      <label className="input-label">{labelText}</label>
      <input
        className="input-input"
        type="text"
        placeholder={placeholderText}
        onChange={onChange} // Include the onChange prop here
      />
    </div>
  );
};

export default InputBox;