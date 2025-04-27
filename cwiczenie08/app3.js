const express = require("express");
const { MongoClient } = require("mongodb");
const morgan = require("morgan");

const uri = "mongodb+srv://mongo1:mongo@cluster0.qt79e.mongodb.net/";

const client = new MongoClient(uri);

const app = express();
const PORT = 8000;


app.use(morgan("dev")); 
app.set("view engine", "pug"); 
app.set("views", "./views"); 

app.get("/:faculty?", async (req, res) => {
  const { faculty } = req.params;

  try {
    await client.connect();
    const db = client.db("AGH"); 
    const collection = db.collection("Students");

    const query = faculty
      ? { faculty: { $regex: new RegExp(`^${faculty}$`, "i") } }
      : {};

    const students = await collection.find(query).toArray();

    console.log("Studenci:", students);

    res.render("students", { title: "Baza danych studentów", students });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
