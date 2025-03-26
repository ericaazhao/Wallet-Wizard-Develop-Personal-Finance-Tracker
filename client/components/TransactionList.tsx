import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function TransactionList() {
  const router = useRouter();
  const [transaction, setTransaction] = useState<
    { id: string; name: string; category_name: string; date: Date; amount: number; created_at: Date }[] | string
  >("Loading...");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/transaction`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTransaction(data);
      });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Transaction List - <button onClick={() => router.push("/transaction/new")} className='bg-blue-100 font-bold w-28 border border-white'>Add new</button></h2>
      <table border={1} align="center" cellPadding={5} cellSpacing={5}>
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Id</th>
            <th className="px-4 py-2 text-left">Transaction Name</th>
            <th className="px-4 py-2 text-left">Category Name</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-right">Amount</th>
            <th className="px-4 py-2 text-left">Created at</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(transaction) && transaction.map((item, index) => (
            <tr
              key={item.id}
              onClick={() => router.push(`/transaction/${item.id}`)}
              className="hover:bg-gray-100 cursor-pointer"
            >
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{item.name}</td>
              <td className="px-4 py-2 border">{item.category_name}</td>
              <td className="px-4 py-2 border">{new Date(item.date).toLocaleDateString()}</td>
              <td className="px-4 py-2 border text-right">{(item.amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td className="px-4 py-2 border">{new Date(item.created_at).toLocaleString('en-US', { timeZoneName: 'short' })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;