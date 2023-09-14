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

async function queryData(res) { res.json(await db.query("SELECT saveId, lvl, money, time, c.name AS 'cpu', g.name AS 'gpu', r.name AS 'ram', s.name AS 'stg' FROM learnthebasics.savedata INNER JOIN cputbl c ON savedata.cpuId = c.hardwareId INNER JOIN gputbl g ON savedata.gpuId = g.hardwareId INNER JOIN ramtbl r ON savedata.ramId = r.hardwareId INNER JOIN stgtbl s ON savedata.stgId = s.hardwareId ORDER BY savedata.saveId")) }
function getData(req, res) { queryData(res) }

app.use("/savedata", getData);

async function openAdminPage(req, res) { res.sendFile(__dirname + '/admin/admin.html'); }

app.get("/admin", openAdminPage);

async function updateDB(data) {
  let x = await db.query('UPDATE savedata SET lvl = ' + data.lvl + ', money = ' + data.money + ', time = ' + data.time + ', cpuId = ' + data.cpu + ', gpuId = ' + data.gpu + ', ramId = ' + data.ram + ', stgId = ' + data.stg + ' WHERE saveId = ' + data.saveId);
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
