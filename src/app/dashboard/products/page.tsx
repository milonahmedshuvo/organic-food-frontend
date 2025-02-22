"use client";
import { useState } from "react";
import { useAllProductsQuery } from "@/redux/api/foodApi";
import Image from "next/image";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
export interface TProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  currency: "BDT" | "USD";
}


export default function ProductsPage() {
  const { data, refetch } = useAllProductsQuery(undefined);
  const [ , setSelectedProduct] = useState<TProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<TProduct>();

  // Open Modal and Set Data
  const openModal = (product: TProduct) => {
    setSelectedProduct(product);
    reset(product); 
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Handle Update
  const onSubmit = async (updatedData: TProduct) => {
    console.log("Updated Data:", updatedData);
    console.log("Updated Data:", updatedData._id);
   
    try {
      const response = await fetch(`http://localhost:5000/api/v1/product/update/${updatedData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        toast.error("Failed to update product")
      }
  
      const result = await response.json();
      console.log("Product updated successfully:", result);
      toast.success("Product updated successfully")
  
      closeModal();
      refetch()
    } catch (err) {
      console.log(err)
      toast.error("Error updating product:");
    }



    closeModal();
  };

  return (
    <div className="p-3 bg-white">
      <h1 className="text-3xl font-medium mt-5 text-green-800 mb-6">
        Manage Products
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-200 text-left">
              <th className="border p-3 text-center">Image</th>
              <th className="border p-3 text-center">Name</th>
              <th className="border p-3 text-center">Price</th>
              <th className="border p-3 text-center">Stock</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((product: TProduct, index: number) => (
              <tr
                key={product._id}
                className={`text-center ${
                  index % 2 === 0 ? "bg-green-50" : "bg-white"
                } hover:bg-green-100 transition`}
              >
                <td>
                  <Image src={product.image} width={70} height={50} alt="img" />
                </td>
                <td className="font-normal text-black_color">{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td className="flex items-center justify-center gap-2 mt-3">
                  <button
                    onClick={() => openModal(product)}
                    className="bg-blue-500 text-white px-3 py-2 rounded flex items-center gap-1 hover:bg-blue-700 transition"
                  >
                    <FiEdit />
                  </button>

                  <button className="bg-red-500 text-white px-3 py-2 rounded flex items-center gap-1 hover:bg-red-700 transition">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Update Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("name")}
                className="w-full p-2 border rounded"
                placeholder="Product Name"
              />

              <textarea
                {...register("description")}
                className="w-full p-2 border rounded"
                placeholder="Description"
              />

              <input
                {...register("price")}
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Price"
              />

              <input
                {...register("stock")}
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Stock"
              />

              <input
                {...register("category")}
                className="w-full p-2 border rounded"
                placeholder="Category"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
