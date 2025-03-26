import React, { useEffect, useState } from "react";

function CategorySelect({value, onChange}: {value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void}) {
  const [category, setCategoryList] = useState<
    { id: string; category_name: string; created_at: Date }[] | string
  >("Loading...");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategoryList(data);
      });
  }, []);

  return (
    <select className="flex-1 border rounded p-1" name="category_id" id="category_id" value={value} onChange={onChange} required>
      <option value="">Select Category</option>
      {Array.isArray(category) && category.map((item) => (
        <option key={item.id} value={item.id}>
          {item.category_name}
        </option>
      ))}
    </select>
  );
}

export default CategorySelect;