export async function getTodos() {
    try {
        //await fetch() hämtar data
        const response = await
            fetch("http://localhost:3000/Todo");
        //kollar status 200
        if (!response.ok) {
            throw new Error("Network error");
        }

        const data = await
            //gör om till JS 
            response.json();
        return data;
    } catch (error) {
        console.error("Fel vid fetch:", error);
        throw error;
    }

}