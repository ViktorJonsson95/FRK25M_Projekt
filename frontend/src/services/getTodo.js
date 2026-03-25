import { getAuthToken } from "./getAuthToken";
const api_url = "http://localhost:3000/Todo";

export const getTodos = async () => {
    try {
        // hämtar Firebase auth-token för den inloggade användaren
        const token = await getAuthToken();

        //await fetch() hämtar data
        const response = await fetch(`${api_url}/Todo`, {
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