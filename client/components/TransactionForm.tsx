import React, { useState } from 'react';
import CategorySelect from './CategorySelect';
import { useRouter } from 'next/router';

const TransactionForm = ({ id }: { id: string }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        date: '',
        description: '',
        amount: '',
        category_id: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`http://localhost:3100/api/transaction/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, amount: parseFloat(formData.amount) * 100 }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            router.push("/");
        });

        console.log('Form data submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-gray-900 rounded-lg">
            <h2>Add Transaction</h2>

            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="text-gray-500"
                />
            </div>

            <div>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="text-gray-500"
                />
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="text-gray-500"
                />
            </div>

            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="text-gray-500"
                />
            </div>

            <div>
                <label htmlFor="category">Category:</label>
                <CategorySelect
                    value={formData.category_id}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default TransactionForm;