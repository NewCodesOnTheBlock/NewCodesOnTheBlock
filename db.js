const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('app-db');
const fs = require('fs');
const file = './app-db';

module.exports = db;

db.createTables = ()=> {
  if(!fs.existsSync(file)){
    db.run(`
      CREATE TABLE users (
        id  VARCHAR(50)
      );
    `);
    db.run(`
      CREATE TABLE favorites (
        user_id VARCHAR(50),
        title VARCHAR(50),
        clicked_url VARCHAR(255)
      );
    `);
    db.run(`
      CREATE TABLE history (
        user_id VARCHAR(50),
        title VARCHAR(50),
        clicked_url VARCHAR(255)
      );
    `);
  }
};
