"use client";
import { useState } from "react";

export default function CustomerTable() {
  // Dummy data (Replace with real API data if needed)
  const [customers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "0123456789",
      address: "New York, USA",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "0987654321",
      address: "London, UK",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "0112233445",
      address: "Toronto, Canada",
    },
  ]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-green-300">
          {/* Table Head */}
          <thead className="bg-green-200">
            <tr>
              <th className="border border-gray-300 p-3 text-left">#</th>
              <th className="border border-gray-300 p-3 text-left">Name</th>
              <th className="border border-gray-300 p-3 text-left">Email</th>
              <th className="border border-gray-300 p-3 text-left">Phone</th>
              <th className="border border-gray-300 p-3 text-left">Address</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id} className="odd:bg-gray-100 even:bg-white">
                <td className="border border-gray-300 p-3">{index + 1}</td>
                <td className="border border-gray-300 p-3">{customer.name}</td>
                <td className="border border-gray-300 p-3">{customer.email}</td>
                <td className="border border-gray-300 p-3">{customer.phone}</td>
                <td className="border border-gray-300 p-3">
                  {customer.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
