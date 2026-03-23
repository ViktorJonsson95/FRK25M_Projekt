import { getAuthToken } from "./getAuthToken";
const api_url = "http://localhost:3000";

// Funktion som skickar en DELETE request till backend för att ta bort en todo
export const deleteTodo = async (id) => {
    try {
        // hämtar Firebase auth-token för den inloggade användaren
        // tokenen skickas med till backend så serverns middleware kan verifiera användaren
        const token = await getAuthToken();

        // Skickar request till endpointen DELETE /Todo/:id
        const response = await fetch(`${api_url}/Todo/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}` //här skickas auth token med till backend
            }
        });

        //Vårt felmeddelande
        if (!response.ok) {
            throw new Error("could not delete todo");
        }
        //Här returneras svaret från backend
        return await response.json();
    } catch (error) {

        console.error("Delete error:", error);
        // Skickar vidare felet så komponenten som anropar funktionen kan hantera det
        throw error;
    }
}
