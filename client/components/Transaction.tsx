import React, { useState, useEffect } from "react";

type TransactionProps = {
  id: string;
};

const Transaction: React.FC<TransactionProps> = ({ id }) => {
  const [transaction, setTransaction] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch transaction details
    fetch(`http://localhost:3100/api/transaction/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTransaction(data);
        setLoading(false);
      });

    // Fetch categories
    fetch("http://localhost:3100/api/category")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, [id]);

  const handleUpdate = () => {
    fetch(`http://localhost:3100/api/transaction/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    })
      .then((response) => response.json())
      .then((data) => setTransaction(data));
  };

  const handleDelete = () => {
    fetch(`http://localhost:3100/api/transaction/${id}`, {
      method: "DELETE",
    }).then(() => {
      alert("Transaction deleted");
      window.location.href = "/";
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Transaction Details</h2>
      <table border={1} style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                value={transaction.name}
                onChange={(e) =>
                  setTransaction({ ...transaction, name: e.target.value })
                }
              />
            </td>
            <td>
              <select
                value={transaction.category_id}
                onChange={(e) =>
                  setTransaction({ ...transaction, category_id: e.target.value })
                }
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="number"
                value={transaction.amount}
                onChange={(e) =>
                  setTransaction({ ...transaction, amount: parseFloat(e.target.value) })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={transaction.description}
                onChange={(e) =>
                  setTransaction({ ...transaction, description: e.target.value })
                }
              />
            </td>
            <td>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleDelete} style={{ color: "red" }}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;