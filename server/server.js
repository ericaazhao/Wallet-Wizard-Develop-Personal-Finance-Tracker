const express = require('express');  
const cors = require('cors');  
const { Pool } = require('pg');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../server/.env.development') });

const app = express();  
const PORT = 3100;  

app.use(cors());  
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

app.get("/api/home", (req, res) => {
  res.json({ message: "Welcome to Wallet Wizard Project" });
});

app.get("/api/transactions", async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    console.log('Got a connection from the pool');
    const resp = await client.query(
      `SELECT t.*, c.name AS category_name 
       FROM transactions t 
       JOIN categories c ON t.category_id = c.id`
    );
    res.json(resp.rows);
  } catch (err) {
    console.error("Error fetching transactions:", err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.release();
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});