"use client";
import Image from "next/image";
import { useState } from "react";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      name: "Almonds",
      price: 15,
      quantity: 2,
      image: "https://htmldemo.net/jena/jena/assets/img/shop/details/1.webp",
    },
    {
      id: 2,
      name: "Organic Apples",
      price: 5,
      quantity: 3,
      image: "https://htmldemo.net/jena/jena/assets/img/shop/details/1.webp",
    },
  ]);

  // Increase quantity
  const increaseQuantity = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Shopping Cart</h1>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-green-300">
          <thead>
            <tr className="bg-green-200 text-left">
              <th className="border p-3 text-center">Image</th>
              <th className="border p-3 text-center">Name</th>
              <th className="border p-3 text-center">Price</th>
              <th className="border p-3 text-center">Quantity</th>
              <th className="border p-3 text-center">Total</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr
                key={item.id}
                className={`text-center ${
                  index % 2 === 0 ? "bg-green-50" : "bg-white"
                } hover:bg-green-100 transition`}
              >
                <td className="border p-3">
                  <Image
                    height={100}
                    width={100}
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="border p-3 font-semibold">{item.name}</td>
                <td className="border p-3">${item.price}</td>
                <td className="border p-3 flex justify-center items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 transition"
                  >
                    <FiMinus />
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 transition"
                  >
                    <FiPlus />
                  </button>
                </td>
                <td className="border p-3">${item.price * item.quantity}</td>
                <td className="border p-3">
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded flex items-center gap-1 hover:bg-red-700 transition"
                    onClick={() => removeItem(item.id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cart Summary */}
      <div className="mt-6 text-right">
        <p className="text-xl font-semibold">
          Total: $
          {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
        </p>
        <button className="bg-green-600 text-white px-5 py-3 mt-4 rounded hover:bg-green-700 transition">
          Checkout
        </button>
      </div>
    </div>
  );
}
