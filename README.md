# Todo-applikation
 
En fullstack Todo-applikation byggd med React och Node.js. Användare kan logga in, skapa, läsa, uppdatera och radera todos. Data lagras per användare i Firestore.
 
---
 
## Screenshots
 
![Login](images/todoLogin.png)
![Todo App](images/todoUI.png)
 
---
 
## Funktioner
 
- Registrera och logga in med Firebase Authentication
- Skapa nya todos
- Läsa och visa alla todos
- Uppdatera titel på en todo
- Markera todo som klar/ej klar (med genomstrykning som visuell feedback)
- Radera todos
- Klocka som visar datum och tid i realtid
- Vädervisning baserad på användarens position
 
---
 
## Tekniker
 
**Frontend**
- React (Vite)
- Firebase Authentication
 
**Backend**
- Node.js
- Cors
- Express
- Firebase Admin SDK
- Firestore
 
---
 
## Installation
 
### Krav
- Node.js installerat
- Git installerat
 
### 1. Klona repot
 
**Alternativ 1 – Terminal:**
```bash
git clone https://github.com/ViktorJonsson95/FRK25M_Projekt
cd FRK25M_Projekt
```

**Alternativ 2 – GitHub:**
1. Gå till https://github.com/ViktorJonsson95/FRK25M_Projekt
2. Klicka på den gröna **"Code"** knappen
3. Klicka **"Download ZIP"** och packa upp mappen

 
### 2. Installera backend
 
```bash
cd backend
npm install
```
 
### 3. Installera frontend
Gå tillbaka till projektets rotmapp
 
```bash
cd .. 
cd frontend 
npm install
```

### 4. Skapa .env

Skapa en `.env`-fil i `backend/` med följande variabler:
 
```
FIREBASE_PROJECT_ID=ditt-projekt-id
FIREBASE_PRIVATE_KEY="din-private-key"
FIREBASE_CLIENT_EMAIL=din-client-email
```
 
---
 
## Starta projektet
 
### 1. Starta backend
 
```bash
cd backend
npm start
```
 
Servern körs på `http://localhost:3000`
 
### 2. Öppna ny terminal och starta frontend
 
```bash
cd frontend
npm run dev
```
 
Frontend körs på `http://localhost:5173`
 
### 3. Öppna appen
 
Gå till `http://localhost:5173` i webbläsaren