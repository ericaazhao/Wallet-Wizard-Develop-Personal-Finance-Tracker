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
    port: process.env.DB_PORT,
});

// Home API
app.get("/api/home", (req, res) => {
    res.json({ message: "Welcome to Wallet Wizard Project" });
});

// Fetch all categories
app.get("/api/category", async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        const resp = await client.query("SELECT id, name, created_at FROM categories ORDER BY created_at DESC");
        res.json(resp.rows);
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (client) client.release();
    }
});

// Fetch all transactions
app.get("/api/transactions", async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        const resp = await client.query(`
            SELECT t.id, t.name, t.amount, t.date, t.created_at, t.description, 
                   c.name AS category_name, c.id AS category_id
            FROM transactions t 
            JOIN categories c ON t.category_id = c.id 
            WHERE t.deleted_at IS NULL
            ORDER BY t.created_at DESC
        `);
        res.json(resp.rows);
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (client) client.release();
    }
});

// Fetch single transaction
app.get("/api/transaction/:id", async (req, res) => {
    let client;
    const { id } = req.params;
    try {
        client = await pool.connect();
        const resp = await client.query(`
            SELECT t.id, t.name, t.amount, t.date, t.created_at, t.description, 
                   c.name AS category_name, c.id AS category_id
            FROM transactions t 
            JOIN categories c ON t.category_id = c.id 
            WHERE t.id = $1
        `, [id]);
        if (resp.rows.length === 0) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json(resp.rows[0]);
    } catch (err) {
        console.error("Error fetching transaction:", err);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (client) client.release();
    }
});

// Create new transaction
app.post("/api/transaction", async (req, res) => {
    let client;
    const { name, amount, description, category_id } = req.body;
    try {
        client = await pool.connect();
        const resp = await client.query(`
            INSERT INTO transactions (name, amount, description, category_id, created_at, updated_at) 
            VALUES ($1, $2, $3, $4, NOW(), NOW()) 
            RETURNING *;
        `, [name, amount, description, category_id]);
        res.json(resp.rows[0]);
    } catch (err) {
        console.error("Error creating transaction:", err);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (client) client.release();
    }
});

// Update transaction
app.put("/api/transaction/:id", async (req, res) => {
    let client;
    const { id } = req.params;
    const { name, amount, description, category_id } = req.body;
    try {
        client = await pool.connect();
        const resp = await client.query(`
            UPDATE transactions 
            SET name = $1, amount = $2, description = $3, category_id = $4, updated_at = NOW() 
            WHERE id = $5 RETURNING *;
        `, [name, amount, description, category_id, id]);
        if (resp.rows.length === 0) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json(resp.rows[0]);
    } catch (err) {
        console.error("Error updating transaction:", err);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (client) client.release();
    }
});

// Delete transaction (soft delete)
app.delete("/api/transaction/:id", async (req, res) => {
    let client;
    const { id } = req.params;
    try {
        client = await pool.connect();
        const resp = await client.query(`
            UPDATE transactions SET deleted_at = NOW() WHERE id = $1 RETURNING *;
        `, [id]);
        if (resp.rowCount === 0) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json({ message: "Transaction deleted" });
    } catch (err) {
        console.error("Error deleting transaction:", err);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (client) client.release();
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});