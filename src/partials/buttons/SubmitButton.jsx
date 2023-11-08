import './SubmitButton.css';

const SubmitButton = ({ onClick }) => {
    return(
        <button className='submit-button' onClick={onClick}>&gt;</button>
    )
}

export default SubmitButton;