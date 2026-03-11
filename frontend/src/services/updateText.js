export async function updateText(id, text) {
    try {
        const response = await
            fetch(`http://localhost:3000/Todo/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({ text })
            });
        if (!response.ok) {
            throw new Error("Failed to update todo text");
        }
        const data = await
            response.json();
        return data;
    } catch (error) {
        console.error("Error updating todo text:", error);
    }
}