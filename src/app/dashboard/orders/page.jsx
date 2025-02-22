"use client";
import { useEffect, useState } from "react";
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
  const [orderData, setOrderData] = useState([]);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          toast.error("User is not authenticated");
          return;
        }

        const response = await fetch("http://localhost:5000/api/v1/order/all", {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        console.log("Orders:", data.data);

        setOrderData(data?.data)

      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [])




  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse border border-gray-200">
          <thead>
            <tr className="bg-green-700 text-white text-lg">
              <th className="p-4 text-left">Product ID</th>
              <th className="p-4 text-left">Customer Name</th>
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
                <td className="p-4 font-medium">{order._id.slice(0, 5)}</td>
                <td className="p-4">{order.customer.name}</td>
                <td className="p-4"> {order.customer.email}</td>
                <td className="p-4">{order.phone}</td>
                <td className="p-4">{order.city}</td>
                <td className="p-4">
                  <span
                    className={`px-4 py-2 rounded-full text-white text-sm font-bold ${order.status === "Pending"
                      ? "bg-yellow-500"
                      : order.status === "Shipped"
                        ? "bg-blue-500"
                        : "bg-green-500"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
