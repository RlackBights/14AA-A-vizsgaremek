const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors');
const db = require('./db');

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: "*",
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

async function queryData(res) { res.json(await db.query('SELECT * FROM savedata')) }
function getData(req, res) { queryData(res) }

app.use("/savedata", getData);

async function updateDB(data) {
  let x = await db.query('UPDATE savedata SET lvl = ' + data.lvl + ', money = ' + data.money + ', time = ' + data.time + ', cpu = ' + data.cpu + ', gpu = ' + data.gpu + ', ram = ' + data.ram + ', stg = ' + data.stg + ' WHERE saveId = ' + data.saveId);
  console.log(x);
}
function changeData(req) { updateDB(req.query) }

app.use("/changedata", changeData);


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
