/*
Denna server hanterar todo-API:t.

Autentisering:
Frontend loggar in via Firebase Auth och skickar en ID-token
i Authorization-headern (Bearer token).

Middleware "authenticate" verifierar tokenen via Firebase Admin.
När tokenen är verifierad får vi användarens uid.

Todos sparas sedan per användare i Firestore:
users/{uid}/todos/{todoId}
*/

//----Importera nödvändiga paket----
import dotenv from "dotenv";
dotenv.config(); // laddar variabler från .env
import express, { json } from 'express';
import cors from 'cors';
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

//----Konfigurera Express-servern----
const app = express();
app.use(json()); //Gör så att express kan tolka JSON-data i body i request
app.use(cors()); //Tillåt anrop från andra domäner (din frontend t.ex)
const PORT = 3000;

//----Läs in din service account key via .env för att kunna använda firebase----
initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        // replace behövs för att \n i .env ska bli riktiga radbrytningar
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
});

const db = getFirestore(); //initiera databas instans

// -----Middleware----
// Middleware som verifierar Firebase auth-token
// Alla requests till todo-endpoints måste ha en giltig token
async function authenticate(req, res, next) {
    try {
        // Token skickas i Authorization header från frontend
        const header = req.headers.authorization;

        // Kontrollera att header finns och har rätt format
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).send("Unauthorized");
        }

        // Plockar ut själva tokenen
        const token = header.split(" ")[1];

        // Verifierar token via Firebase Admin
        const decoded = await getAuth().verifyIdToken(token);

        // Lägger till användarens info på requesten
        req.user = decoded;

        // Fortsätter till endpointen
        next();

    } catch (error) {
        // Token ogiltig eller expired
        return res.status(401).send("Invalid token");

    }
}
//----Endpoints----

//GET TEST endpoint (ingen auth)
app.get('/test', async (req, res) => {
    res.status(200).json({ message: "Lyckades" });
});

//POST - skapa ny todo
app.post('/Todo', authenticate, async (req, res) => {
    try {
        const { completed, title, createdAt } = req.body;

        if (!title) {
            return res.status(400).send('Title missing');
        }

        const newTodo = {
            title: title,
            completed: completed || false,
            createdAt: createdAt || Date.now()
        }

        const docRef = await db.collection("users").doc(req.user.uid).collection("todos").add(newTodo);

        res.status(200).json({
            id: docRef.id,
            ...newTodo
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//DELETE - ta bort todo
app.delete('/Todo/:id', authenticate, async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send('ID missing');
        }

        await db.collection("users").doc(req.user.uid).collection("todos").doc(id).delete();

        res.status(200).json({
            message: "success :P",
            id: id,
        })

    } catch (error) {
        console.error(error);
        console.log('Gick inte ta bort todo');
        res.status(500).json({ error: "Delete failed" });
    }

})

//GET - hämta alla todos för användaren
app.get('/Todo', authenticate, async (req, res) => {
    try {
        const snapshot = await db.collection("users").doc(req.user.uid).collection("todos").get();

        // om inga todos → returnera tom array
        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const todos = [];

        snapshot.forEach(doc => {
            const data = doc.data();
            todos.push({
                id: doc.id,
                title: data.title,
                completed: data.completed,
                createdAt: data.createdAt
            });
        });

        res.status(200).json(todos); // return the array as JSON
    } catch (error) {
        console.error(error);
        console.log('get did not work');
        res.status(500).json({ error: "Failed to get todos" });
    }
})

//PUT - uppdatera todo (title och/eller completed)
app.put('/Todo/:id', authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        const { title, completed } = req.body;

        const updateData = {};

        // uppdatera endast fält som skickas med
        if (title !== undefined) updateData.title = title;
        if (completed !== undefined) updateData.completed = completed;

        await db
            .collection("users")
            .doc(req.user.uid)
            .collection("todos")
            .doc(id)
            .update(updateData);

        res.status(200).json({
            id,
            ...updateData
        });

    } catch (error) {
        console.error(error);
        console.log('put funkar inte');
        res.status(500).json({ error: "Failed to update todo" });
    }
})

app.listen(PORT, () => {
    console.log(`Server kör på http://localhost:${PORT}`);
});
