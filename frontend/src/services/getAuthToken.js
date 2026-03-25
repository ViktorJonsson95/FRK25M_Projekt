import { auth } from "../../firebase";

// Hämtar en JWT-token (JSON Web Token) för den inloggade användaren
export const getAuthToken = async () => {
    const user = auth.currentUser; // nuvarande inloggad användare

    // Om ingen användare är inloggad → ingen token
    if (!user) return null;

    // Hämta ID-token från Firebase (används för autentisering mot backend)
    const token = await user.getIdToken();

    return token;
}
