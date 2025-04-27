import { Application, Router, Context } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

// Konfiguracja aplikacji
const app = new Application();
const router = new Router();
const PORT = 8000;

// Konfiguracja MongoDB
const mongoUrl = "mongodb+srv://mongo:mongo@cluster0.lrtxw.mongodb.net/";
const dbName = "guestbook";
let entriesCollection;

// Funkcja inicjalizująca połączenie z bazą danych
const initDb = async () => {
  const client = new MongoClient();
  await client.connect(mongoUrl);
  const db = client.database(dbName);
  entriesCollection = db.collection("entries");
  console.log("✅ Połączono z bazą danych MongoDB");
};

// Middleware do obsługi błędów
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("❌ Wystąpił błąd:", err);
    ctx.response.status = 500;
    ctx.response.body = "Wewnętrzny błąd serwera.";
  }
});

// Trasa GET(/): Wyświetlenie wpisów oraz formularza
router.get("/", async (ctx) => {
  try {
    // Pobranie wszystkich wpisów z bazy danych
    const entries = await entriesCollection.find({}).toArray();

    // Renderowanie szablonu z wpisami
    const html = await renderFile(`${Deno.cwd()}/views/guestbook.eta`, { entries });

    if (html) {
      ctx.response.body = html;
    } else {
      ctx.response.status = 500;
      ctx.response.body = "Błąd renderowania szablonu.";
    }
  } catch (error) {
    console.error("❌ Błąd pobierania wpisów:", error);
    ctx.response.status = 500;
    ctx.response.body = "Błąd ładowania wpisów.";
  }
});

// Trasa POST(/): Przetwarzanie formularza i dodanie wpisu
router.post("/", async (ctx) => {
  try {
    const body = ctx.request.body({ type: "form" });
    const formData = await body.value;

    const name = formData.get("name") || "Anonymous";
    const message = formData.get("message") || "Brak wiadomości";

    const newEntry = {
      name: name,
      message: message,
      date: new Date(),
    };

    // Dodanie nowego wpisu do bazy danych
    await entriesCollection.insertOne(newEntry);
    ctx.response.redirect("/");
  } catch (error) {
    console.error("❌ Błąd dodawania wpisu:", error);
    ctx.response.status = 500;
    ctx.response.body = "Nie udało się zapisać wpisu.";
  }
});

// Zastosowanie routera
app.use(router.routes());
app.use(router.allowedMethods());

// Uruchomienie aplikacji
initDb()
  .then(() => {
    app.listen({ port: PORT });
    console.log(`🚀 Aplikacja działa na http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.error("❌ Nie udało się połączyć z bazą danych:", err);
    Deno.exit(1);
  });
