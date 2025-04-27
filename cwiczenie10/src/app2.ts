import { Application, Router, Request, Response } from "https://deno.land/x/oak/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo/mod.ts";

const mongoClient = new MongoClient();
await mongoClient.connect("mongodb://localhost:27017");

const db = mongoClient.database("guestbook");
const entriesCollection = db.collection("entries");

const app = new Application();
const router = new Router();

// Trasa GET (wyświetl aktualne wpisy oraz formularz dodawania nowego wpisu)
router.get("/", async (context: any) => {
    const entries = await entriesCollection.find().toArray();

    context.response.body = `
        <h1>Księga gości</h1>
        <form method="POST" action="/">
            <input type="text" name="name" placeholder="Twoje imię" required />
            <textarea name="message" placeholder="Twoja wiadomość" required></textarea>
            <button type="submit">Dodaj wpis</button>
        </form>
        <h2>Aktualne wpisy:</h2>
        <ul>
            ${entries.map((entry) => `<li><strong>${entry.name}:</strong> ${entry.message}</li>`).join("")}
        </ul>
    `;
});

// Trasa POST (przetwarzanie zawartości formularza — dodawanie nowego wpisu do bazy danych)
router.post("/", async (context: any) => {
    const body = await context.request.body();
    const value = body.value;

    const newEntry = {
        name: value.name,
        message: value.message,
    };

    await entriesCollection.insertOne(newEntry);
    context.response.redirect("/");
});

// Użycie routera
app.use(router.routes());
app.use(router.allowedMethods());

// Uruchamianie serwera
const port = 3000;
console.log(`Aplikacja działa na http://localhost:${port}`);
await app.listen({ port });