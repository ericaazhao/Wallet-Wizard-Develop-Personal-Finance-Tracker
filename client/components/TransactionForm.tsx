import React, { useState } from 'react';
import CategorySelect from './CategorySelect';
import { useRouter } from 'next/router';

const TransactionForm = ({id}:{id:string}) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        id,
        name: '',
        date: '',
        description: '',
        amount: '',
        category_id: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/transaction/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({...formData, amount: parseFloat(formData.amount) * 100}),
          }).then((response) => response.json())
            .then((data) => {
              console.log(data);
              router.push("/");
            });
        console.log('Form data submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4 p-4 bg-gray-200 rounded-lg  w-1/2'>
            <h2 className="text-l font-bold">Add Transaction</h2>
         <div className="flex items-center space-x-4">
                <label htmlFor="name">Name : </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='flex-1 border rounded p-1'
                />
            </div>
            <div className="flex items-center space-x-4">
                <label htmlFor="date">Date : </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                     className='flex-1 border rounded p-1'
                />
            </div>
            <div className="flex items-center space-x-4">
                <label htmlFor="description">Description : </label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                     className='flex-1 border rounded p-1'
                />
            </div>
            <div className="flex items-center space-x-4">
                <label htmlFor="amount">Amount : </label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                     className='flex-1 border rounded p-1'
                />
            </div>
            <div className="flex items-center space-x-4">
                <label htmlFor="category">Category : </label>
                <CategorySelect
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    />
                
            </div>
            <button type="submit" className='bg-blue-200 font-bold w-full'>Add Transaction</button>
        </form>
    );
};

export default TransactionForm;