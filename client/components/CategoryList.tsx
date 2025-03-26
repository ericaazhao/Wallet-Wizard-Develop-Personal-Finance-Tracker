import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


function CategoryList() {
  const router = useRouter();
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
    <div>
      <h2 className="text-xl font-bold">Category List - <button onClick={() => router.push("/category/new")} className='bg-blue-100 font-bold w-28 border border-white'>Add new</button></h2>
      <table border={1} align="center" cellPadding={5} cellSpacing={5}>
      <thead className="bg-gray-200">
      <tr>
            <th className="px-4 py-2 text-left">Id</th>
     
            <th className="px-4 py-2 text-left">Category Name</th>

            <th className="px-4 py-2 text-left">Created at</th>
          </tr>
        </thead>
        <tbody>
         {Array.isArray(category) && category.map((item, index) => (
            <tr key={item.id} onClick={() => router.push(`/category/${item.id}`)} className="hover:bg-gray-100 cursor-pointer">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{item.category_name}</td>
              <td className="px-4 py-2 border">{new Date(item.created_at).toLocaleString('en-US', { timeZoneName: 'short' })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;