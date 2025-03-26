import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface CategoryType {
  id: string;
  category_name: string;
  created_at: string | Date;
}

function CategoryList() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3100"}/api/category`);
        const data = await res.json();
        console.log("Fetched categories:", data);
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Category List</h2>
        <button
          onClick={() => router.push("/category/new")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-4 rounded"
        >
          Add New
        </button>
      </div>

      {loading ? (
        <div className="text-gray-600 text-center py-10">Loading...</div>
      ) : categories.length === 0 ? (
        <div className="text-gray-500 text-center py-10">No categories found.</div>
      ) : (
        <table className="w-full table-auto border-collapse shadow-md rounded overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Category Name</th>
              <th className="px-4 py-2 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr
                key={item.id}
                onClick={() => router.push(`/category/${item.id}`)}
                className="hover:bg-gray-50 cursor-pointer transition"
              >
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{item.category_name}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(item.created_at).toLocaleString("en-US", {
                    timeZoneName: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CategoryList;