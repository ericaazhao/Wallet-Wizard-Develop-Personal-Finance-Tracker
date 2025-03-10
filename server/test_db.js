const { Pool } = require("pg");

const pool = new Pool({
    user: "ericazhao",
    host: "localhost",
    database: "wallet_wizard",
    password: "mypassword",
    port: 5432,
});

pool.connect()
    .then(() => {
        console.log("✅ Database connected successfully!");
        return pool.query("SELECT NOW();");
    })
    .then((res) => {
        console.log("✅ Current Timestamp from DB:", res.rows[0]);
        pool.end();
    })
    .catch((err) => {
        console.error("❌ Database connection error:", err.message);
        pool.end();
    });