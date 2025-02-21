"use client";
import { useState } from "react";
import Image from "next/image";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CheckoutPage() {
  // Sample Cart Data
  const [cart] = useState<CartItem[]>([
    {
      id: 1,
      name: "Almonds",
      price: 15,
      quantity: 2,
      image: "/images/almonds.jpg",
    },
    {
      id: 2,
      name: "Organic Apples",
      price: 5,
      quantity: 3,
      image: "/images/apples.jpg",
    },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    shippingMethod: "standard",
    deliveryInstructions: "",
    paymentMethod: "credit_card",
  });

  // Handle Form Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Order Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Order placed successfully!");
  };

  return (
    <div className=" p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Checkout</h1>

      {/* FLEX Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Billing & Shipping Section */}
        <div className="flex-1 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">
            Billing & Shipping Details
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            />

            {/* Email & Phone */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="flex-1">
                <label className="font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Address */}
            <label className="font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            />

            {/* City & ZIP Code */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="flex-1">
                <label className="font-medium text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Shipping Method */}
            <label className="font-medium text-gray-700">Shipping Method</label>
            <select
              name="shippingMethod"
              value={formData.shippingMethod}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="standard">Standard (5-7 days) - $5</option>
              <option value="express">Express (2-3 days) - $15</option>
              <option value="overnight">Overnight (1 day) - $25</option>
            </select>

            {/* Payment Method */}
            <label className="font-medium text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cod">Cash on Delivery</option>
            </select>

            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-2"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>
                    Qty: {item.quantity} × ${item.price}
                  </p>
                  <p className="font-bold">
                    Total: ${item.quantity * item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total Calculation */}
          <p className="text-xl font-bold mt-4">
            Subtotal: $
            {cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </p>

          <p className="text-xl font-bold text-green-700">
            Total: $
            {cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ) + 5}
          </p>
        </div>
      </div>
    </div>
  );
}
