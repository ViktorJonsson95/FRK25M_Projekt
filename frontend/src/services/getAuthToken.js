import { auth } from "../../firebase";

export async function getAuthToken() {
    const user = auth.currentUser;

    if (!user) return null;

    const token = await user.getIdToken();

    return token;
}