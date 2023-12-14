const express = require("express"); // csak egy backend library a node.js mellé hogy segítse a cuccokat
const app = express(); // inicializálja az object-et amivel lehet az adatbázissal kommunikálni
const port = 8000; // backend port
const cors = require("cors"); // engedélyezi a CORS átállítását, ilyen internetes security cucc hogy limitálja ki honnan mit kérhet le
const db = require("./db"); // behozza a db.js fájlt hogy lehessen lekérést küldeni
const crypto = require("crypto");
var insertValues = ["''"];

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

  console.log(req.query.userAuthCode)
  
  if(req.query.userAuthCode == undefined) {
    console.log('ERROR');
    return;
  }

  if(!req.query.userAuthCode.includes('$'))
  {
    console.log('ERROR')
    return;
  }

  res.json(
    await db.query(
      "SELECT saveId, lvl, time, money, c.name AS 'cpu', g.name AS 'gpu', r.name AS 'ram', s.name AS 'stg' FROM usertbl " +
      "INNER JOIN savedata ON " +
      "savedata.userId = usertbl.uid " +
      "INNER JOIN cputbl c ON savedata.cpuId = c.hardwareId " +
      "INNER JOIN gputbl g ON savedata.gpuId = g.hardwareId " +
      "INNER JOIN ramtbl r ON savedata.ramId = r.hardwareId " +
      "INNER JOIN stgtbl s ON savedata.stgId = s.hardwareId " +
      `WHERE userTbl.name = '${req.query.userAuthCode.split('$')[0]}' AND userTbl.password = '${req.query.userAuthCode.split('$')[1]}'`
    )
  );

}
 // A "getData" átmeneti function-nel küld lekérést

async function checkData(req, res) {
  res.json(
    await db.query(
      "SELECT password FROM login WHERE username = '" + req.body.username + "'"
    )
  );
} //admin page login


//tábla nevek lekérése az admin page-hez
async function getTableNames(req, res) {res.json(await db.query("SELECT table_name FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'LearnTheBasics'"))}


//tábla column name lekérése admin page-hez
async function getFields(req, res) {res.json(await db.query("SELECT DISTINCT(column_name), COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME= '" + req.body.table + "'"))}


//insertInto query
async function insertIntoTables(req, res) {
  var insert = "INSERT INTO " + req.body.list[0] + " VALUES ";
  tableName = req.body.list[0];
  for (let index = 1; index < req.body.list.length; index++) {
    insertValues.push("'" +req.body.list[index]+ "'");
  }
  res.json(await db.query(insert + "("+[insertValues]+")"));
  insertValues = ["''"];
}





// Admin page betöltése, a CSS része nem működik, jó lenne kitalálni hogy ne cask egy fájlba lehessen dolgozni
app.use("/admin", express.static(__dirname + "/admin")); // betölti az admin oldalt

async function loginAttempt(req, res) {
  const answer = await db.query("SELECT password FROM userTbl WHERE name = '" + req.body.username + "'");
  const userPassword = crypto.createHash('md5').update(req.body.password).digest('hex');

  if (answer.length == 0) {
    res.status(400).json({ message: "Login failed!" });
    return;
  }

  if (answer[0].password === userPassword) {
    res.status(200).json({ message: "Login success!", loginAuthCode: (req.body.username + "$" + userPassword) });
  } else {
    res.status(400).json({ message: "Login failed!" });
  }
}



async function registerAttempt(req, res) {
  let existsError = false;
  let names = await db.query(`SELECT name FROM userTbl`);
  names.forEach(element => {
    if (req.body.username == element.name) {
      res.status(401).json({message: "A user with this name already exists!"});
      existsError = true;
    }
  })

  if (existsError) return;
    await db.query("INSERT INTO userTbl VALUES " +
                   "(0, '" + req.body.username + "', MD5('" + req.body.password + "'), "+ (req.body.isAdmin == 1) ? "TRUE" : "FALSE" +");")

    await db.query("INSERT INTO savedata VALUES " +
    "(0, (SELECT uid FROM usertbl WHERE name = '" + req.body.username + "' AND password = MD5('" + req.body.password + "') LIMIT 1), 1, -1, 0, 0, 0, 0, 0, 0), " +
    "(0, (SELECT uid FROM usertbl WHERE name = '" + req.body.username + "' AND password = MD5('" + req.body.password + "') LIMIT 1), 2, -1, 0, 0, 0, 0, 0, 0), " +
    "(0, (SELECT uid FROM usertbl WHERE name = '" + req.body.username + "' AND password = MD5('" + req.body.password + "') LIMIT 1), 3, -1, 0, 0, 0, 0, 0, 0); ")

    res.status(200).json({message: "Successful registration!"})
}



// szintén sima SQL lekérés, itt viszont feltölti az adatokat, ennyi
async function changeData(req, res) {
  console.log(req.body);
  await db.query(
    "UPDATE savedata SET " +
    `lvl = ${req.body.lvl}, money = ${req.body.money}, time = ${req.body.time}, cpuId = ${req.body.cpu}, gpuId = ${req.body.gpu}, ramId = ${req.body.ram}, stgId = ${req.body.stg} ` +
    `WHERE saveId = '${req.body.saveId}' AND userId = (SELECT uid FROM usertbl WHERE name = '${req.body.userAuthCode.split('$')[0]}' AND password = '${req.body.userAuthCode.split('$')[1]}' LIMIT 1)`
  ).then((response) => {
    console.log(response);
  });
}


// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});


app.use("/savedata", getData);
app.use("/admin/checkData", checkData);
app.use("/admin/getTableNames", getTableNames);
app.use("/admin/getFields", getFields);
app.use("/admin/insertIntoTables", insertIntoTables);
app.use("/login", loginAttempt);
app.use("/register", registerAttempt);
app.use("/changedata", changeData);

// Ez indítja a szervert
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
