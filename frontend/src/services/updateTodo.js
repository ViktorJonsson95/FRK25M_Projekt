import { getAuthToken } from "./getAuthToken";
const api_url = "http://localhost:3000";

//Funktion som skickar en PUT-request för att uppdatera en todo
export const updateTodo = async (id, updatedTodo) => { // id är id:t på den todo som ska uppdateras, updatedTodo är det objekt som innehåller den nya titeln
    try {
        const token = await getAuthToken();
        const response = await fetch(`${api_url}/Todo/${id}`, {// här specificerar vi att det är en PUT request och skickar med id:t på den todo som ska uppdateras
            method: "PUT",
            headers: {
                "Content-Type": "application/json", // Skickar JSON i request body
                Authorization: `Bearer ${token}`//skicka med auth token till backend så servern kan verifiera användaren via middleware
            },
            body: JSON.stringify(updatedTodo), // Skickar uppdaterade todon
        });

        if (!response.ok) { // Kollar om status inte är 200-299
            throw new Error("Could not update todo"); // Om status inte är 200-299 kastas ett fel som fångas i catch-blocket
        }

        // Returner svaret från backend
        return await response.json();
    } catch (error) {
        console.error("Update error", error);// Loggar felet i konsolen för debugging
        throw error;
    }
}