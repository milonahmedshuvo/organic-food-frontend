"use client";
import { useAllCustomersQuery } from "@/redux/api/foodApi";


interface TUser {
  _id : string,
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: "customer" | "admin";
  wishlist?: string[];
}

export default function CustomerTable() {
  const {data} = useAllCustomersQuery(undefined)
  


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
              <th className="border border-gray-300 p-3 text-left">Role</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data?.data?.map((customer:TUser, index:number) => (
              <tr key={customer._id} className="odd:bg-gray-100 even:bg-white">
                <td className="border border-gray-300 p-3">{index + 1}</td>
                <td className="border border-gray-300 p-3">{customer.name}</td>
                <td className="border border-gray-300 p-3">{customer.email}</td>
                <td className="border border-gray-300 p-3">
                  {customer.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
