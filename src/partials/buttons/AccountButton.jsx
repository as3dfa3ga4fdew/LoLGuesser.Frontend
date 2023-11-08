import './AccountButton.css';

const AccountButton = ({ text, onClick }) => {
  return (
    <button className="account-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default AccountButton;