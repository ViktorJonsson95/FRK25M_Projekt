
export async function updateStatus(id, completed) {
    try {
        const response = await fetch(`http://localhost:3000/Todo/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed })
        });

        if (!response.ok) {
            throw new Error("Failed to update todo");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error updating todo:", error);
    }
}
