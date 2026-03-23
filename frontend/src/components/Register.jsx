import { useState } from "react";
import { registerUser } from "../services/registerUser";
import { isValidUsername } from "../services/usernameUtils";

const Register = ({ setShowRegister }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidUsername(username)) {
            setError("Username must be 3-20 characters, letters and numbers only");
            return;
        }

        try {
            await registerUser(username, password);
        } catch (error) {
            setError(error.message);
        }
    };

    return (

        <div className="login-page">
            <div className="login-card">

                <h2 className="login-title">Register</h2>

                <ul className="register-rules">
                    <li>Username must be 3–20 characters</li>
                    <li>Password must be at least 6 characters</li>
                </ul>

                <form onSubmit={handleSubmit} className="login-form">

                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />

                    <button className="login-button">
                        Create account
                    </button>

                </form>

                {error && <p className="error-message">{error}</p>}

                <button
                    onClick={() => setShowRegister(false)}
                    className="create-account-button"
                >
                    Back to login
                </button>

            </div>
        </div>
    );
}

export default Register;