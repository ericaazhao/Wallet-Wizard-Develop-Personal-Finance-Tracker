import React, { useEffect, useState } from "react";

interface CategoryType {
  id: string;
  category_name: string;
  created_at: string | Date;
}

function CategorySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3100"}/api/category`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <select
      name="category_id"
      id="category_id"
      value={value}
      onChange={onChange}
      required
      className="flex-1 border rounded p-2 text-gray-700"
    >
      <option value="">
        {loading ? "Loading..." : "Select Category"}
      </option>
      {!loading &&
        categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.category_name}
          </option>
        ))}
    </select>
  );
}

export default CategorySelect;