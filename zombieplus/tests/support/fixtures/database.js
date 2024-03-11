const { Pool } = require("pg");

const DbConfig = {
  user: "shxgzvmr",
  host: "kesavan.db.elephantsql.com",
  database: "shxgzvmr",
  password: "oZG4_SVMku_kriJJbs-pJI7uIgoqTgEB",
  port: 5432,
};

export async function executeSQL(sqlScript) {
    const pool = new Pool(DbConfig);
    let client
    try {
    client = await pool.connect();

    const result = await client.query(sqlScript);
    console.log(result.rows);

  } catch (error) {
    console.log(`Erro ao executar SQL ${error}`);
    
  } finally {
    if (client) {
        client.release();
      }
  }
}