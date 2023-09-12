const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM savedata`);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function postData(data, saveId) {
  const response = await db.query("UPDATE savedata SET lvl = " + data.lvl + ", money = " + data.money + ", time = " + data.time + ", cpu = " + data.cpu + ", gpu = " + data.gpu + ", ram = " + data.ram + ", stg = " + data.stg + " WHERE saveId = " + saveId);
  console.log(response);
}

module.exports = {
  getMultiple,
  postData,
};
