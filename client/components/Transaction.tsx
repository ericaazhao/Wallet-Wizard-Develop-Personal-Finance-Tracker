import React, { useState, useEffect } from "react";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    description: "",
    category_id: "",
  });

  useEffect(() => {
    fetch("http://localhost:3100/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));

    fetch("http://localhost:3100/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleAddTransaction = () => {
    fetch("http://localhost:3100/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions([...transactions, data]);
        setNewTransaction({
          name: "",
          amount: 0,
          date: new Date().toISOString().split("T")[0],
          description: "",
          category_id: "",
        });
        setShowForm(false); 
      });
  };

  return (
    <div>
      <h3>Transactions</h3>
      <table border={1} style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{categories.find((c) => c.id === t.category_id)?.name || "Unknown"}</td>
              <td>${t.amount.toFixed(2)}</td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td>{t.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#008CBA",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        {showForm ? "Cancel" : "+ Add Transaction"}
      </button>

      {showForm && (
        <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#222", borderRadius: "5px" }}>
          <h3>Create New Transaction</h3>
          <input
            type="text"
            placeholder="Transaction Name"
            value={newTransaction.name}
            onChange={(e) => setNewTransaction({ ...newTransaction, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
          />
          <input
            type="date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          />
          <select
            value={newTransaction.category_id}
            onChange={(e) => setNewTransaction({ ...newTransaction, category_id: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddTransaction}>Add Transaction</button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;