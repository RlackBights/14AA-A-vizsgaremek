const mysql = require("mysql2/promise"); // mysql library import
const config = require("./config"); // a config file import

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db); // Megnyit egy kapcsolatot az SQL szerverrel a config alapján
  const [results] = await connection.execute(sql, params); // lefuttatja a parancsot ami a paraméterben meglett adva, sima SQL lekérés pl. SELECT * FROM savedata
  connection.end(); // Lezárja a kapcsolatot miután megkaptuk a szükséges adatokat, kell hogy ne töltődjön túl a szerver
  return results; // Visszaadja az adatokat 
}

module.exports = { // ez csak lehetővé teszi a function hívását más js fájlokból ha importálva van
  query,
};
