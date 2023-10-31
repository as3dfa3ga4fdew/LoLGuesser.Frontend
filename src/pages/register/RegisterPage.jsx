import "./RegisterPage.css";
import AccountButton from "../../partials/buttons/AccountButton";
import InputBox from "../../partials/inputs/InputBox";

const RegisterPage = () => {
    return(
    
    <div className="register-container">
        <div className="register-window">
            <div className="register-credentials">
                <InputBox labelText="Användarnamn"/>
                <InputBox labelText="Lösenord" />
                <AccountButton text="Registrera"/>
            </div>
            
        </div>
    </div>

    )
}

export default RegisterPage;