import React, { useEffect, useState } from "react";
import moment from "moment-timezone"; 

type Transaction = {
  id: string;
  name: string;
  category_name?: string;
  amount: number;
  date: string;
  created_at: string;
  description?: string;
};

function Index() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:3100/api/home")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3100/api/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#fff", backgroundColor: "#111", padding: "20px" }}>
      <h1>{message}</h1>
      <h2>Transactions</h2>
      <table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid white" }}>
        <thead>
          <tr style={{ backgroundColor: "#333", fontWeight: "bold", textTransform: "uppercase" }}>
            <th style={{ border: "1px solid white", padding: "6px" }}>Id</th>
            <th style={{ border: "1px solid white", padding: "6px" }}>Transaction Name</th>
            <th style={{ border: "1px solid white", padding: "6px" }}>Category Name</th>
            <th style={{ border: "1px solid white", padding: "6px" }}>Date</th>
            <th style={{ border: "1px solid white", padding: "6px" }}>Amount</th>
            <th style={{ border: "1px solid white", padding: "6px" }}>Created at</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((t, index) => (
              <tr key={t.id || index} style={{ textAlign: "center" }}>
                <td style={{ border: "1px solid white", padding: "6px" }}>{index + 1}</td>
                <td style={{ border: "1px solid white", padding: "6px" }}>{t.name || "N/A"}</td>
                <td style={{ border: "1px solid white", padding: "6px" }}>
                  <span style={{
                    backgroundColor: "#666",
                    padding: "4px 12px",
                    borderRadius: "10px",
                    color: "#fff",
                    fontWeight: "bold"
                  }}>
                    {t.category_name || "N/A"}
                  </span>
                </td>
                <td style={{ border: "1px solid white", padding: "6px" }}>
                  {t.date ? moment(t.date).format("M/DD/YYYY") : "N/A"}
                </td>
                <td style={{ border: "1px solid white", padding: "6px", fontWeight: "bold" }}>
                  {t.amount ? `$${(t.amount / 100).toFixed(2)}` : "$0.00"}
                </td>
                <td style={{ border: "1px solid white", padding: "6px" }}>
                  {t.created_at ? moment.tz(t.created_at, "America/Los_Angeles").format("M/DD/YYYY, h:mm:ss A z") : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "6px" }}>No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Index;