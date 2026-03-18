import { useState } from "react";
import { loginUser } from "../services/loginUser";
import Register from "./Register";
import { isValidUsername } from "../services/usernameUtils";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidUsername(username)) {
            setError("Username must be 3-20 characters, letters and numbers only");
            return;
        }

        try {
            await loginUser(username, password);
        } catch (error) {
            setError("Login failed");
            console.log("Login failed")
        }
    };
    //om showRegister = true så visa Register och skicka med setShowRegister som prop så det kan ändras i Register också.
    if (showRegister) {
        return <Register setShowRegister={setShowRegister} />;
    }
    return (
        <div className="login-page">
            <div className="login-card">
                <form onSubmit={handleSubmit} className="login-form">

                    <h2 className="login-title">Login</h2>
                    <input
                        type="text"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)} className="login-input"
                    />

                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)} className="login-input"
                    />

                    <button className="login-button">Login</button>
                </form>
                {error && <p className="login-error">{error}</p>}
                <button type="button" onClick={() => setShowRegister(true)} className="create-account-button">
                    Create account
                </button>
            </div>
        </div>

    );
}

export default Login;