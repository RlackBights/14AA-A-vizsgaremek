
// Itt elég egyértelmű minden hogy mit csinál, csak a beállítások hogy elérje az adatbázist, ennyi

const config = {
  db: {
    host: "bgs.jedlik.eu",
    user: "learnthebasics",
    password: "LtB20231214",
    database: "learnthebasics",
    connectTimeout: 60000,
  },
  listPerPage: 10,
};
module.exports = config;
