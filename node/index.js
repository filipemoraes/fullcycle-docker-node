const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

const config = {
  host: process.env.MYSQL_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'fullcycle'
};

app.get('/', async (req, res) => {
  const connection = await mysql.createConnection(config);
  await connection.execute(`CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`);
  await connection.execute(`INSERT INTO people(name) VALUES ('Filipe ${Date.now()}')`);
  const [rows] = await connection.execute('SELECT * FROM people');
  let namesList = '';
  
  rows.forEach(row => {
    namesList += `<li>${row.name}</li>`;
  });
  
  res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
  connection.end();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
