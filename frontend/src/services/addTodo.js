export async function addTodo(title) {
    try {
        const response = await
            fetch("http://localhost:3000/todos", {
                method: "POST",// säger till server att vi skapar ny data
                headers: { 
                    "Content-Type": "application/json"// säger att vi skickar JSON data
                },
                body: JSON.stringify({ title }) // skickar själva todo_texten till backend
            });
        if (!response.ok) {
            throw new Error(" Network error");
        }
        const data = await
            response.json();
        return data;
    } catch (error) {
        console.error("Fel vid POST:", error);
        throw error;
    }
}