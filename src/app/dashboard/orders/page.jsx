"use client";
import { useState } from "react";
import Image from "next/image";

const orders = [
  {
    id: 1,
    productImage:
      "https://htmldemo.net/jena/jena/assets/img/shop/details/1.webp",
    productName: "Organic Apple",
    price: "$10",
    quantity: 2,
    customerName: "John Doe",
    email: "john@example.com",
    phone: "+8801700000000",
    address: "123 Street, City",
    status: "Pending",
  },
  {
    id: 2,
    productImage:
      "https://htmldemo.net/jena/jena/assets/img/shop/details/1.webp",
    productName: "Fresh Carrot",
    price: "$5",
    quantity: 5,
    customerName: "Jane Smith",
    email: "jane@example.com",
    phone: "+8801711111111",
    address: "456 Avenue, City",
    status: "Shipped",
  },
  {
    id: 3,
    productImage:
      "https://htmldemo.net/jena/jena/assets/img/shop/details/1.webp",
    productName: "Organic Milk",
    price: "$15",
    quantity: 1,
    customerName: "Michael Brown",
    email: "michael@example.com",
    phone: "+8801722222222",
    address: "789 Boulevard, City",
    status: "Delivered",
  },
];

export default function OrdersPage() {
  const [orderData] = useState(orders);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse border border-gray-200">
          <thead>
            <tr className="bg-green-700 text-white text-lg">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Qty</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Status</th>
              {/* <th className="p-4 text-left">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {orderData.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-300 hover:bg-gray-100 transition"
              >
                <td className="p-4 font-semibold">{order.id}</td>
                <td className="p-4">
                  <Image
                    src={order.productImage}
                    alt={order.productName}
                    width={60}
                    height={60}
                    className="rounded"
                  />
                </td>

                <td className="p-4">{order.productName}</td>
                <td className="p-4">{order.price}</td>
                <td className="p-4">{order.quantity}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">{order.email}</td>
                <td className="p-4">{order.phone}</td>
                <td className="p-4">{order.address}</td>
                <td className="p-4">
                  <span
                    className={`px-4 py-2 rounded-full text-white text-sm font-bold ${
                      order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Shipped"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                {/* <td className="p-4 space-x-2">
                  <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition">
                    View
                  </button>
                  <button className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition">
                    Edit
                  </button>
                  <button className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition">
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
