"use client";
import Image from "next/image";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import { store } from "../../redux/store"
import { addToProduct, decreaseProduct, removeProduct } from "@/redux/features/cart/cartSlice";
import Link from "next/link";

export interface TProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  currency: "BDT" | "USD";
  quantity: number
}


export default function CartPage() {
  const allState = useSelector((state: RootState) => state.cart);

  // console.log({allState})
  // console.log('prduce4ee', allState?.products)


  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-28 px-3 md:px-14 lg:px-24">
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
            {allState?.products.map((item, index) => (
              <tr
                key={item._id}
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
                    onClick={() => store.dispatch(decreaseProduct(item)) }
                    className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 transition"
                  >
                    <FiMinus />
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => store.dispatch(addToProduct(item)) }
                    className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 transition"
                  >
                    <FiPlus />
                  </button>
                </td>
                <td className="border p-3">${item.price * item.quantity}</td>
                <td className="border p-3">
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded flex items-center gap-1 hover:bg-red-700 transition"
                    onClick={() => store.dispatch(removeProduct(item)) }
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
           {allState?.totaltk}
        </p>
        <Link href='/checkout'>
        <button className="bg-green-600 text-white px-5 py-3 mt-4 rounded hover:bg-green-700 transition">
          Checkout
        </button>
        </Link>
      </div>
    </div>
  );
}
