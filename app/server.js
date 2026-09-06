const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

app.use(express.json());

const client = new MongoClient(
  `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongodb:27017/?authSource=admin`
);

app.get("/", (req, res) => {
  res.send("☕ Hello from my Dockerized Coffee Dashboard!");
});

app.get("/api/coffees", async (req, res) => {
  try {
    const db = client.db("coffee-dashboard");
    const coffees = await db.collection("coffees").find().toArray();

    res.json(coffees);
  } catch (error) {
    console.error("Failed to fetch coffees:", error);
    res.status(500).json({ error: "Failed to fetch coffees" });
  }
});

app.post("/api/coffees", async (req, res) => {
  try {
    const db = client.db("coffee-dashboard");
    const result = await db.collection("coffees").insertOne(req.body);

    res.status(201).json({
      message: "Coffee added",
      coffeeId: result.insertedId
    });
  } catch (error) {
    console.error("Failed to add coffee: ", error);
    res.status(500).json({ error: "Failed to add coffee"});
  }
});

async function start() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    app.listen(port, () => {
      console.log(`Coffee Dashboard is running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

start();