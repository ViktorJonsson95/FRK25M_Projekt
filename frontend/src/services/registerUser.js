import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { usernameToEmail } from "./usernameUtils";

export async function registerUser(username, password) {
    // Konverterar username till fake email
    const email = usernameToEmail(username);

    try {
        // Skapar användaren i Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        // Returnerar användarobjektet
        return userCredential.user;

    } catch (error) {

        // Om email redan finns betyder det att username redan är taget
        if (error.code === "auth/email-already-in-use") {
            throw new Error("Username already taken");
        }

        // Firebase kräver minst 6 tecken i lösenord
        if (error.code === "auth/weak-password") {
            throw new Error("Password must be at least 6 characters");
        }

        throw new Error("Registration failed");
    }
}