import http from "node:http";
import fs from "node:fs/promises"; 
import url from "node:url";

const PORT = 8000;
const FILE_PATH = "./entries.txt";

async function renderEntries() {
  let entriesHTML = "";
  try {
    const entries = await fs.readFile(FILE_PATH, "utf-8");
    const entriesArray = entries.split("\n").filter(Boolean);
    entriesHTML = entriesArray
      .map((entry) => {
        const [name, message] = entry.split("||");
        return `<p><strong>${name}</strong><br>${message}</p>`;
      })
      .join("");
  } catch (err) {
    console.error("Error reading entries:", err);
  }
  return entriesHTML;
}

async function saveEntry(name, message) {
  const entry = `${name}||${message}\n`;
  try {
    await fs.appendFile(FILE_PATH, entry);
  } catch (err) {
    console.error("Error saving: ", err);
  }
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/" && req.method === "GET") {
    const entriesHTML = await renderEntries();

    const html = `
            <!DOCTYPE html>
            <html lang="pl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Księga gości</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    strong { font-size: 1.2em; }
                    form { margin-top: 20px; }
                </style>
            </head>
            <body>
                <h1>Księga gości</h1>
                <div id="entries">
                    ${entriesHTML}
                </div>
                <form id="entryForm">
                    <h2>Nowy wpis:</h2>
                    <label>Twoje imię i nazwisko
                        <input type="text" name="name" required>
                    </label>
                    <br><br>
                    <label>Treść wpisu
                        <textarea name="message" required></textarea>
                    </label>
                    <br><br>
                    <button type="submit">Dodaj wpis</button>
                </form>

                <script>
                    document.getElementById('entryForm').addEventListener('submit', async function(e) {
                        e.preventDefault();

                        const formData = new FormData(this);
                        const name = formData.get('name');
                        const message = formData.get('message');

                        const response = await fetch('/add', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name, message })
                        });

                        if (response.ok) {
                            const entriesHTML = await response.text();
                            document.getElementById('entries').innerHTML = entriesHTML;
                            this.reset();
                        } else {
                            alert('Wystąpił błąd podczas dodawania wpisu');
                        }
                    });
                </script>
            </body>
            </html>
        `;

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  } else if (parsedUrl.pathname === "/add" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const { name, message } = JSON.parse(body);
        await saveEntry(name, message);

        const entriesHTML = await renderEntries();
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(entriesHTML);
      } catch (err) {
        console.error("Error processing entry:", err);
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("500 - Server Error");
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 - Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:8000`);
});
