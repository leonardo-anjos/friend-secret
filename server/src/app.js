require("dotenv-safe").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// const frontPath = path.join(__dirname, '..', '..', 'webapp/build');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.static(frontPath));

app.get("/", (req, res, next) => {
  res.json({ appName: "app-name" });
  res.sendFile(path.join(frontPath, "index.html"));
});

const VERSIONS = process.env.VERSIONS
  ? JSON.parse(process.env.VERSIONS)
  : { "Pre-Release": "v0", "API: Version 1": "v1" };

app.get("/api/versions", (req, res) => {
  res.json(VERSIONS);
});

for (let key in VERSIONS) {
  require(`./api/${VERSIONS[key]}/router`)(app);
}

module.exports = app;
