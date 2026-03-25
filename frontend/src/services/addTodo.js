import { getAuthToken } from "./getAuthToken";
const api_url = "http://localhost:3000"; // api_url är bas-URL:en för vår backend, används i alla våra service-filer för att göra API-anrop

export const addTodo = async (todoObject) => { // todoObject är det objekt som skickas in från AddTodo.jsx, innehåller title, completed och createdAt
    if (!todoObject.title) return;
    try {
        const token = await getAuthToken();
        const response = await fetch(`${api_url}/Todo`, { // Skickar POST-request till backend för att skapa en ny todo
            method: "POST",// säger till server att vi skapar ny data
            headers: {
                "Content-Type": "application/json",// säger att vi skickar JSON data
                Authorization: `Bearer ${token}` //skicka med auth token till backend så servern kan verifiera användaren via middleware
            },
            body: JSON.stringify(todoObject) // skickar själva todo_texten till backend
        });
        if (!response.ok) { // kollar om status inte är 200-299
            throw new Error(" Network error");
        }
        const data = await response.json(); // gör om svaret från backend till JS-objekt, innehåller den nya todon som skapats i backend
        return data;
    } catch (error) { // fångar eventuella fel som kan uppstå under fetchen
        console.error("Fel vid POST:", error);// loggar felet i konsolen för debugging
        throw error;
    }
}
