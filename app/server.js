const http = require("http");
const { MongoClient } = require("mongodb");

const client = new MongoClient(
  `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@coffee-db:27017/?authSource=admin`
);

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("☕ Hello from my Dockerized Coffee Dashboard!");
});

async function start() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    server.listen(3000, () => {
      console.log("Coffee Dashboard is running on port 3000");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

start();