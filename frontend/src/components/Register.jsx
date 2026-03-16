import { useState } from "react";
import { registerUser } from "../services/registerUser";
import { isValidUsername } from "../services/usernameUtils";
function Register({ setShowRegister }) {

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
            console.log("Register failed", error);
            setError(error.message);
        }
    };

    return (
        <div className="register">
            <form onSubmit={handleSubmit}>

                <h2>Register</h2>
                <ul className="register-rules">
                    <li>Username must be 3–20 characters and contain only letters or numbers.</li>
                    <li>Password must be at least 6 characters.</li>
                </ul>
                <input
                    type="text"
                    placeholder="username..."
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="password..."
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button>Create account</button>

            </form>
            {error && <p>{error}</p>}
            <button onClick={() => setShowRegister(false)}>
                Back to login
            </button>
        </div>
    );
}

export default Register;