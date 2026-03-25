import { getAuthToken } from "./getAuthToken";
const api_url = "http://localhost:3000/Todo";

export const getTodos = async () => { // Funktion som hämtar alla todos för den inloggade användaren från backend
    try {
        // hämtar Firebase auth-token för den inloggade användaren
        const token = await getAuthToken();

        //await fetch() hämtar data
        const response = await fetch(`${api_url}/Todo`, { // här specificerar vi att det är en GET request och skickar med auth token i headern så backend kan verifiera användaren via middleware
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}` //skicka med auth token till backend
            }
        });
        //kollar status 200
        if (!response.ok) {
            throw new Error("Network error");
        }

        const data = await
            //gör om till JS 
            response.json();
        return data;
    } catch (error) {
        console.error("Fel vid fetch:", error);
        throw error;
    }

}