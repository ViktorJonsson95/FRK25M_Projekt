const api_url = "http://localhost:3000";

// Funktion som skickar en DELETE request till backend för att ta bort en todo
export async function deleteTodo(id) {
    try {
        // Skickar request till endpointen DELETE /Todo/:id
        // id sätts in i URL:en så backend vet vilken todo som ska tas bort
        const response = await fetch(`${api_url}/Todo/${id}`, {
            method: "DELETE",
        });

        //Vårt felmeddelande
        if(!response.ok) {
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