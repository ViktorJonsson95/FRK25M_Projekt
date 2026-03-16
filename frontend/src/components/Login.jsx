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
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
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

                <button>Login</button>
            </form>
            {error && <p>{error}</p>}
            <button type="button" onClick={() => setShowRegister(true)}>
                Create account
            </button>
        </div>

    );
}

export default Login;