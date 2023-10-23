import "./RegisterPage.css";

const RegisterPage = () => {
    return(
    
    <div className="container">
        <div className="window">
            <div className="credentials">
                <div className="label">Användarnamn</div>
                <input type="text" className="cred" />
                <div className="label">Lösenord</div>
                <input type="text" className="cred" />
            </div>
            <button className="submit-btn">Submit</button>
        </div>
    </div>

    )
}

export default RegisterPage;