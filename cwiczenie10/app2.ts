import { Application, Router, Context } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import { MongoClient, Collection } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

interface GuestbookEntry {
  name: string;
  message: string;
  date: Date;
}

const app = new Application();
const router = new Router();
const PORT = 8000;

const mongoUrl = "mongodb+srv://mongo:mongo@cluster0.lrtxw.mongodb.net/";
const dbName = "guestbook";
let entriesCollection: Collection<GuestbookEntry>;

const initDb = async (): Promise<void> => {
  const client = new MongoClient();
  await client.connect(mongoUrl);
  const db = client.database(dbName);
  entriesCollection = db.collection<GuestbookEntry>("entries");
  console.log("Connected to MongoDB");
};

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = "Internal server error.";
  }
});

router.get("/", async (ctx: Context) => {
  try {
    const entries: GuestbookEntry[] = await entriesCollection.find({}).toArray();
    const html = await renderFile(`${Deno.cwd()}/views/guestbook.eta`, {
      entries,
    });
    if (html) {
      ctx.response.body = html;
    } else {
      ctx.response.status = 500;
      ctx.response.body = "Template rendering failed.";
    }
  } catch (error) {
    console.error("Error fetching entries:", error);
    ctx.response.status = 500;
    ctx.response.body = "Error loading guestbook entries.";
  }
});

router.post("/", async (ctx: Context) => {
  const body = ctx.request.body({ type: "form" });
  const formData = await body.value;

  const name = formData.get("name") || "Anonymous";
  const message = formData.get("message") || "No message";

  const newEntry: GuestbookEntry = {
    name: name.toString(),
    message: message.toString(),
    date: new Date(),
  };

  try {
    await entriesCollection.insertOne(newEntry);
    ctx.response.redirect("/");
  } catch (error) {
    console.error("Error adding entry:", error);
    ctx.response.status = 500;
    ctx.response.body = "Error saving your entry.";
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

initDb()
  .then(() => {
    app.listen({ port: PORT });
    console.log(`Guestbook app running on http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    Deno.exit(1);
  });
