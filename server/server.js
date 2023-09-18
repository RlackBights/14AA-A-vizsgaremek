const express = require("express"); // csak egy backend library a node.js mellé hogy segítse a cuccokat
const app = express(); // inicializálja az object-et amivel lehet az adatbázissal kommunikálni
const port = 8000; // backend port
const cors = require("cors"); // engedélyezi a CORS átállítását, ilyen internetes security cucc hogy limitálja ki honnan mit kérhet le
const db = require("./db"); // behozza a db.js fájlt hogy lehessen lekérést küldeni
const crypto = require("crypto");

app.use(
  cors({
    origin: "*", // honnan jöhetnek kérések
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"], // milyen kérések jöhetnek
    allowedHeaders: "*", // kell-e kötelező header hogy elfogadja a kérést, majd ennél kell kiokoskodni a biztonsági részt
  })
);

app.use(express.json()); // hozzáadja az express json fordítóját
app.use(
  express.urlencoded({
    // Kitaláltam, body parsing a POST request-ekre
    extended: true,
  })
);

// lekérések

// sima SQL lekérés, a db.query paranccsal
async function getData(req, res) {
  console.log(req.query.userAuthCode);
  res.json(
    await db.query(
      "SELECT saveId, lvl, money, time, c.name AS 'cpu', g.name AS 'gpu', r.name AS 'ram', s.name AS 'stg' FROM learnthebasics.savedata INNER JOIN cpuTbl c ON savedata.cpuId = c.hardwareId INNER JOIN gpuTbl g ON savedata.gpuId = g.hardwareId INNER JOIN ramTbl r ON savedata.ramId = r.hardwareId INNER JOIN stgTbl s ON savedata.stgId = s.hardwareId ORDER BY savedata.saveId"
    )
  );
}
app.use("/savedata", getData); // A "getData" átmeneti function-nel küld lekérést

async function checkData(req, res) {
  res.json(
    await db.query(
      "SELECT password FROM login WHERE username = '" + req.body.username + "'"
    )
  );
} //admin page login
app.use("/admin/checkData", checkData);

// Admin page betöltése, a CSS része nem működik, jó lenne kitalálni hogy ne cask egy fájlba lehessen dolgozni
app.use("/admin", express.static(__dirname + "/admin")); // betölti az admin oldalt

async function loginAttempt(req, res) {
  const answer = await db.query("SELECT password FROM userTbl WHERE name = '" + req.body.username + "'");
  const userPassword = crypto.createHash('md5').update(req.body.password).digest('hex').slice(0, 25);

  if (answer.length == 0) {
    console.log("fail!");
    res.status(400).json({message: "Login failed!"});
    return;
  }

  if (answer[0].password === userPassword) {
    console.log("Successful login!");
    res.status(200).json({message: "Login success!", loginAuthCode: (req.body.username + "$" + userPassword)});
  } else {
    console.log("Login failed!");
    res.status(400).json({message: "Login failed!"});
  }
}

app.use("/login", loginAttempt)

// szintén sima SQL lekérés, itt viszont feltölti az adatokat, ennyi
async function changeData(req, res) {
  await db.query(
    "UPDATE savedata SET lvl = " +
      req.body.lvl +
      ", money = " +
      req.body.money +
      ", time = " +
      req.body.time +
      ", cpuId = " +
      req.body.cpu +
      ", gpuId = " +
      req.body.gpu +
      ", ramId = " +
      req.body.ram +
      ", stgId = " +
      req.body.stg +
      " WHERE saveId = " +
      req.body.saveId
  );
}
app.use("/changedata", changeData);

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Ez indítja a szervert
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
