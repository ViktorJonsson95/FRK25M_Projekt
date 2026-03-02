//----Importera nödvändiga paket----
import dotenv from "dotenv";
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

//----Konfigurera Express-servern----
const app = express();
app.use(json()); //Gör så att express kan tolka JSON-data i body i request
app.use(cors()); //Tillåt anrop från andra domäner (din frontend t.ex)
const PORT = 3000;

//----Läs in din service account key via .env för att kunna använda firebase----
initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
});

const db = getFirestore();


//----Endpoints----

//GET
app.get('/test', async (req, res) => {
    res.status(200).json({ message: "Lyckades" });
});

//POST
app.post('/Todo', async (req, res) => {
    try {
        const { completed, title } = req.body;

        if (!req.body.title) {
            return res.status(400).send('Title missing');
        }

        const newTodo = {
            title: title,
            completed: completed || false
        }

        const docRef = await db.collection('Todos').add(newTodo);

        res.status(200).json({
            id: docRef.id,
            ...newTodo
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//DELETE
app.delete('/Todo/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send('ID missing');
        }

        const docRef = await db.collection('Todos').doc(id).delete();

        res.status(200).json({
            message: "sucess",
            id: docRef.id,
        })

    } catch (error) {
        console.error(error);
        console.log('Gick inte ta bort todo');
    }

})

//GET
app.get('/Todo', async (req, res) => {
    try {
        const snapshot = await db.collection('Todos').get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const todos = [];

        snapshot.forEach(doc => {
            const data = doc.data();
            todos.push({
                id: doc.id,
                title: data.title,
                completed: data.completed
            });
        });

        res.status(200).json(todos); // return the array as JSON
    } catch (error) {
        console.error(error);
        console.log('get did not work');
    }
})

//PUT
app.put('/Todo/:id', async (req, res) => {
    try {
        const completed = req.body.completed;
        const id = req.params.id;

        const docRef = await db.collection('Todos').doc(id).update({ completed: completed });

        res.status(200).json({
            id: docRef.id,
            completed: completed
        })

    } catch (error) {
        console.error(error);
        console.log('put funkar inte');
    }
})

app.listen(PORT, () => {
    console.log(`Server kör på http://localhost:${PORT}`);
});
