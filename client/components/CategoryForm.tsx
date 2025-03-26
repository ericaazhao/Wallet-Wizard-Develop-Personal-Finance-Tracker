import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CategoryForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3100';
      const res = await fetch(`${apiHost}/api/category/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name }),
      });

      const data = await res.json();
      console.log('Form data submitted:', data);
      router.push('/');
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 p-4 bg-gray-200 rounded-lg w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold">Add Category</h2>

      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="font-medium">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
          className="border rounded p-2 text-gray-700"
          placeholder="Enter category name"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Add Category'}
      </button>
    </form>
  );
};

export default CategoryForm;