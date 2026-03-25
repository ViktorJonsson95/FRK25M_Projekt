import { getAuthToken } from "./getAuthToken";
const api_url = "http://localhost:3000";

// Funktion som skickar en DELETE request till backend för att ta bort en todo
export const deleteTodo = async (id) => {
    try {
        // hämtar Firebase auth-token för den inloggade användaren
        // tokenen skickas med till backend så serverns middleware kan verifiera användaren
        const token = await getAuthToken();

        // Skickar request till endpointen DELETE /Todo/:id
        const response = await fetch(`${api_url}/Todo/${id}`, { // här specificerar vi att det är en DELETE request och skickar med id:t på den todo som ska tas bort
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}` //här skickas auth token med till backend
            }
        });

        //Vårt felmeddelande
        if (!response.ok) {
            throw new Error("could not delete todo"); // Om status inte är 200-299 kastas ett fel som fångas i catch-blocket
        }
        //Här returneras svaret från backend
        return await response.json();
    } catch (error) {

        console.error("Delete error:", error);
        // Skickar vidare felet så komponenten som anropar funktionen kan hantera det
        throw error;
    }
}
