export async function updateStatus(id, completed) { 
    const response = await
        fetch(`http://localhost:3000/todos/${id}`, { // id är unikt för varje todo, så vi kan uppdatera rätt todo.
            method: "PATCH", // säger till server att vi vill uppdatera en del av datan (i det här fallet, bara "completed" statusen)
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed }),// skickar den nya "completed" statusen till backend, som är antingen true eller false.
        });

    return response.json();
}