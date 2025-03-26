import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Category({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<{
    id: string;
    name: string;
    created_at: Date;
  }>({
    id: "",
    name: "",
    created_at: new Date(),
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category/${id}`)
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      setCategory(data);
      setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

<div className='flex flex-col space-y-4 p-4 bg-gray-200 rounded-lg w-1/2'>
<h2 className="text-l font-bold">Category Edit/Delete</h2>


<div className="flex items-center space-x-4">
<label htmlFor="id">ID : </label>{category.id}
</div>
<div className="flex items-center space-x-4">
<label htmlFor="name">Name : </label>
<input
                className="flex-1 border rounded p-1"
                type="text"
                value={category.name}
                onChange={(e) =>
                  setCategory((prev) => ({ ...prev, name: e.target.value }))
                }
              />
</div>
<div className="flex items-center space-x-4">
<label htmlFor="created_at">Created At : </label>  
              {new Date(category.created_at).toLocaleString("en-US", {
                timeZoneName: "short",
              })}
</div>
          
<div className="flex items-center space-x-4">

              <button 
               className='bg-blue-200 font-bold w-full'
                onClick={() => {
                  fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category/${id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(category),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      router.replace("/");
                      setCategory(data);
                    });
                }}
              >
                Update
              </button>
</div> 
<div className="flex items-center space-x-4">

              <button
               className='bg-red-300 font-bold w-full'
                onClick={() => {
                  fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category/${id}`, {
                    method: "DELETE",
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      router.replace("/");
                    });
                }}
              >
                Delete
              </button>
            
            </div>
    </div>
  );
}

export default Category;