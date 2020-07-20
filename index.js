const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./queries");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ info: "Node.js Express, and Postgres ApI" });
});

app.get("/anime", db.getAnime);
app.get("/anime/:id", db.getAnimeById);
app.post("/anime", db.createAnime);
app.put("/anime/:id", db.updateAnime);
app.delete("/anime/:id", db.deleteAnime);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
