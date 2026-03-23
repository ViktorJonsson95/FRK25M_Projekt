import { getAuthToken } from "./getAuthToken";
const api_url = "http://localhost:3000";

//Funktion som skickar en PUT-request för att uppdatera en todo
export const updateTodo = async (id, updatedTodo) => {
    try {
        const token = await getAuthToken();
        const response = await fetch(`${api_url}/Todo/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", // Skickar JSON i request body
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedTodo), // Skickar uppdaterade todon
        });

        if (!response.ok) {
            throw new Error("Could not update todo");
        }

        // Returner svaret från backend
        return await response.json();
    } catch (error) {
        console.error("Update error", error);
        throw error;
    }
}