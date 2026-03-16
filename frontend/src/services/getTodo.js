import { getAuthToken } from "./getAuthToken";

export async function getTodos() {
    try {
        // hämtar Firebase auth-token för den inloggade användaren
        const token = await getAuthToken();

        //await fetch() hämtar data
        const response = await
            fetch("http://localhost:3000/Todo", {
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