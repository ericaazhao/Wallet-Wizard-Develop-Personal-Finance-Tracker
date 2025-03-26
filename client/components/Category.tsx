import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface CategoryType {
  id: string;
  name: string;
  created_at: string | Date;
}

function Category({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<CategoryType | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3100"}/api/category/${id}`);
        const data = await res.json();
        console.log("Fetched:", data);
        setCategory(data);
      } catch (err) {
        console.error("Failed to fetch category:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleUpdate = async () => {
    if (!category) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      const data = await res.json();
      console.log("Updated:", data);
      setCategory(data);
      router.replace("/");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("Deleted:", data);
      router.replace("/");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) {
    return <div className="text-gray-600 text-center p-4">Loading...</div>;
  }

  if (!category) {
    return <div className="text-red-500 text-center p-4">Category not found.</div>;
  }

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-200 rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold">Edit / Delete Category</h2>

      <div className="flex items-center space-x-4">
        <label>ID:</label>
        <span>{category.id}</span>
      </div>

      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1">Name:</label>
        <input
          type="text"
          id="name"
          value={category.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
          className="border rounded p-2 text-gray-700"
        />
      </div>

      <div className="flex items-center space-x-4">
        <label>Created At:</label>
        <span>
          {new Date(category.created_at).toLocaleString("en-US", {
            timeZoneName: "short",
          })}
        </span>
      </div>

      <button
        onClick={handleUpdate}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Update
      </button>

      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Delete
      </button>
    </div>
  );
}

export default Category;