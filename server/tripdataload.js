// JavaScript
const fs = require('fs');
const csv = require('csv-parser');
const sql = require('mssql');
require('dotenv').config();

const readCSV = (filePath) => {
  const data = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data))
      .on('error', reject);
  });
};

const connectToDB = () => {
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
  };
  return sql.connect(config);
};

const insertDataToDB = async (tableName, data) => {
  const table = new sql.Table(tableName);
  Object.keys(data[0]).forEach((key) => table.columns.add(key, sql.VarChar(255)));
  data.forEach((row) => table.rows.add(...Object.values(row)));
  const request = new sql.Request();
  return request.bulk(table);
};

const main = async (filePath, tableName) => {
  try {
    const data = await readCSV(filePath);
    await connectToDB();
    await insertDataToDB(tableName, data);
    console.log('Data loaded to Azure SQL Database successfully');
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = { main };