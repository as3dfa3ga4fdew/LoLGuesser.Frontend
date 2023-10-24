import AccountButton from "../../partials/buttons/AccountButton";
import InputBox from "../../partials/inputs/InputBox";
import "./LoginPage.css";

const LoginPage = () => {
    return(
        <div className="container">
            <div className="window">

                <div className="credentials">
                    <InputBox labelText="Användarnamn"/>
                    <InputBox labelText="Lösenord"/>
                </div>

            <AccountButton text="Logga in"/>
            </div>
        </div>
    )
}

export default LoginPage;