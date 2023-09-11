const express = require("express");
const app = express();
const port = 8000;
const savedata = require("./routes/savedata");
const savedataRouter = require("./routes/savedata");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/savedata", savedataRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/*
const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "LearnTheBasics",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

function getSaveData() {
  connection.query("SELECT * FROM savedata", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    return result[0];
  });
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: getSaveData() });
});

app.get("/savefile", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
*/
