import { getAuthToken } from "./getAuthToken";
const api_url = "http://localhost:3000";

export const addTodo = async (todoObject) => {
    if (!todoObject.title) return;
    try {
        const token = await getAuthToken();
        const response = await fetch(`${api_url}/Todo`, {
            method: "POST",// säger till server att vi skapar ny data
            headers: {
                "Content-Type": "application/json",// säger att vi skickar JSON data
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(todoObject) // skickar själva todo_texten till backend
        });
        if (!response.ok) {
            throw new Error(" Network error");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fel vid POST:", error);
        throw error;
    }
}
