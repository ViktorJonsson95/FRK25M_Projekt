import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { usernameToEmail } from "./usernameUtils";

export async function loginUser(username, password) {

    // Firebase Auth kräver email + password. funktionen tar username konverterar det till en "fake email". (username@todo.app)
    const email = usernameToEmail(username);

    // Skickar login-request till Firebase
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
    // Returnerar användarobjektet, innehåller bl.a. uid(user ID)
    return userCredential.user;
}