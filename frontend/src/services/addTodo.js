export async function addTodo(todoObject) {
    if (!todoObject.title) return;
    try {
        const response = await
            fetch("http://localhost:3000/Todo", {
                method: "POST",// säger till server att vi skapar ny data
                headers: {
                    "Content-Type": "application/json"// säger att vi skickar JSON data
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