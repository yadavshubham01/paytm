import axios from "axios";
import { useState, useEffect } from "react";

export const History = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/account/history", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      //console.log(res.data.transaction); // check what backend sends
      setTransactions(res.data.transaction); // safe fallback
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col justify-center">
        <h1 className="text-xl font-bold mb-4">Transaction History</h1>
        <div className="w-full flex justify-center">
        <table className="table-auto border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border px-4 py-2">Sender Name</th>
              <th className="border px-4 py-2">Receiver Name</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id}>
                <td className="border px-4 py-2">{tx.senderId?.username}</td>
                <td className="border px-4 py-2">{tx.recivedId.username}</td>
                <td className="border px-4 py-2">₹{tx.amount}</td>
                <td className="border px-4 py-2">{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <p className="mt-4 text-gray-500">No transactions found.</p>
        )}
        </div>
      </div>
    </div>
  );
};
