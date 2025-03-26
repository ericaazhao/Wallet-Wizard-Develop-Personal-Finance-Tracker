import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CategoryForm = ({id}:{id:string}) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        id,
        name: '',
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
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then((response) => response.json())
            .then((data) => {
              console.log(data);
              router.push("/");
            });
        console.log('Form data submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4 p-4 bg-gray-200 rounded-lg w-1/2'>
            <h2 className="text-l font-bold">Add Category</h2>
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
           
            <button type="submit" className='bg-blue-200 font-bold w-full'>Add Category</button>
        </form>
    );
};

export default CategoryForm;