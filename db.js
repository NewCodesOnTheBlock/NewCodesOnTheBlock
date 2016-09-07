const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('app-db');
const fs = require('fs');
const file = './app-db';

module.exports = db;
db.createTables = ()=> {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id  VARCHAR(50),
      user_name VARCHAR(50),
      user_img VARCHAR(225)
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id VARCHAR(50),
      title VARCHAR(50),
      venueName VARCHAR(50),
      city VARCHAR(50),
      date VARCHAR(50),
      url VARCHAR(50),
      artists VARCHAR(50),
      UNIQUE(user_id, title, venueName, city, date, url, artists)
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS history (
      user_id VARCHAR(50),
      title VARCHAR(50),
      clicked_url VARCHAR(255)
    );
  `);
};
