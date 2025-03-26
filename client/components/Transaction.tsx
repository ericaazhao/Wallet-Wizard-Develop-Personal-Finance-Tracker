import React, { useState, useEffect } from "react";

interface Transaction {
  id?: string;
  name: string;
  amount: number;
  date: string;
  description: string;
  category_id: string;
}

interface Category {
  id: string;
  category_name: string;
  created_at: string | Date;
}

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newTransaction, setNewTransaction] = useState<Transaction>({
    name: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    description: "",
    category_id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tRes, cRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/transactions`),
          fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category`),
        ]);
        const [tData, cData] = await Promise.all([tRes.json(), cRes.json()]);
        setTransactions(tData);
        setCategories(cData);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTransaction = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });
      const data = await res.json();
      setTransactions((prev) => [...prev, data]);
      setNewTransaction({
        name: "",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        description: "",
        category_id: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to add transaction:", err);
    }
  };

  const getCategoryName = (category_id: string) => {
    return categories.find((c) => c.id === category_id)?.category_name || "Unknown";
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">Transactions</h3>

      {loading ? (
        <div className="text-center text-gray-600 py-4">Loading...</div>
      ) : (
        <table className="w-full table-auto border-collapse mb-4 shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Category</th>
              <th className="px-4 py-2 border-b text-left">Amount</th>
              <th className="px-4 py-2 border-b text-left">Date</th>
              <th className="px-4 py-2 border-b text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{t.name}</td>
                <td className="px-4 py-2 border-b">{getCategoryName(t.category_id)}</td>
                <td className="px-4 py-2 border-b">${(t.amount / 100).toFixed(2)}</td>
                <td className="px-4 py-2 border-b">{new Date(t.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b">{t.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
      >
        {showForm ? "Cancel" : "+ Add Transaction"}
      </button>

      {showForm && (
        <div className="mt-4 bg-gray-100 p-4 rounded space-y-2">
          <h3 className="text-lg font-semibold mb-2">Create New Transaction</h3>

          <input
            type="text"
            placeholder="Transaction Name"
            value={newTransaction.name}
            onChange={(e) => setNewTransaction({ ...newTransaction, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Amount (e.g. 12.99)"
            value={(newTransaction.amount / 100).toFixed(2)}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, amount: Math.round(parseFloat(e.target.value || "0") * 100) })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <select
            value={newTransaction.category_id}
            onChange={(e) => setNewTransaction({ ...newTransaction, category_id: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.category_name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddTransaction}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
          >
            Add Transaction
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;