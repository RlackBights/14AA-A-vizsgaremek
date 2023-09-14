
// Itt elég egyértelmű minden hogy mit csinál, csak a beállítások hogy elérje az adatbázist, ennyi

const config = {
  db: {
    host: "localhost",
    user: "root",
    password: "",
    database: "LearnTheBasics",
    connectTimeout: 60000,
  },
  listPerPage: 10,
};
module.exports = config;
