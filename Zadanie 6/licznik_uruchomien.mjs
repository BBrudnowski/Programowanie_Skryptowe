import fs from "node:fs";
import { argv } from "node:process";

const filePath = "./counter.txt";

function updateCounterSync() {
  let counter = 0;
  try {
    const data = fs.readFileSync(filePath, "utf-8"); //wczytanie danych z pilku
    counter = parseInt(data, 10) || 0;
  } catch (err) {
    console.error("Error: ", err.message);
  }

  counter++;
  try {
    fs.writeFileSync(filePath, counter.toString()); //zwrócenie danych
    console.log(`Liczba uruchomień: ${counter}`);
  } catch (err) {
    console.error("Error: ", err.message);
  }
}

function updateCounterAsync() {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error: ", err.message);
      return;
    }

    let counter = parseInt(data, 10) || 0; 
    counter++;
    fs.writeFile(filePath, counter.toString(), (err) => {
      if (err) {
        console.error("Error: ", err.message);
        return;
      }

      console.log(`Liczba uruchomień: ${counter}`);
    });
  });
}

if (argv.includes("--sync")) {
  updateCounterSync();
} else if (argv.includes("--async")) {
  updateCounterAsync();
} else {
  console.log("Należy użyć --sync lub --async jako argumentu");
}
