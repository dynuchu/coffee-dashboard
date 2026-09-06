const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

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

app.put("/api/coffees/:id", async (req, res) => {
  try {
    const db = client.db("coffee-dashboard");

    const result = await db.collection("coffees").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Coffee not found" });
    }

    res.json({ message: "Coffee updated" });
  } catch (error) {
    console.error("Failed to update coffee:", error);
    res.status(500).json({ error: "Failed to update coffee" });
  }
});

app.delete("/api/coffees/:id", async (req, res) => {
  try {
    const db = client.db("coffee-dashboard");

    const result = await db.collection("coffees").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Coffee not found "});
    }

    res.json({message: "Coffee deleted"});
  } catch (error) {
    console.error("Failed to delete coffee:", error);
    res.status(500).json({error: "Failed to delete coffee"});
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