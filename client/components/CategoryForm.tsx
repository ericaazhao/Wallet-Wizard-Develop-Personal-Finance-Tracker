import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

const CategoryForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3100/api/category/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, name }),
        });
        const data = await res.json();
        console.log('Form data submitted:', data);
        router.push('/');
      } catch (err) {
        console.error('Submit error:', err);
      } finally {
        setLoading(false);
      }
    },
    [id, name, router]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 p-4 bg-gray-900 rounded-lg"
    >
      <h2 className="text-xl font-semibold text-white">Add Category</h2>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm text-white mb-1">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
          className="p-2 rounded text-gray-800"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Add Category'}
      </button>
    </form>
  );
};

export default CategoryForm;