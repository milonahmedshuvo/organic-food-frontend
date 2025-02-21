"use client";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Almonds", price: 15, stock: 30 },
    { id: 2, name: "Organic Apples", price: 5, stock: 50 },
    { id: 3, name: "Walnuts", price: 20, stock: 25 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Open modal with selected product
  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  // Handle input change in modal
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentProduct) return;
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev!, [name]: value }));
  };

  // Save updated product
  const handleSave = () => {
    if (!currentProduct) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === currentProduct.id ? currentProduct : p))
    );
    setIsModalOpen(false); // Close modal
  };

  // Handle delete
  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Manage Products
      </h1>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-green-300">
          <thead>
            <tr className="bg-green-200 text-left">
              <th className="border p-3 text-center">ID</th>
              <th className="border p-3 text-center">Name</th>
              <th className="border p-3 text-center">Price</th>
              <th className="border p-3 text-center">Stock</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`text-center ${
                  index % 2 === 0 ? "bg-green-50" : "bg-white"
                } hover:bg-green-100 transition`}
              >
                <td className="border p-3">{product.id}</td>
                <td className="border p-3 font-semibold">{product.name}</td>
                <td className="border p-3">${product.price}</td>
                <td className="border p-3">{product.stock}</td>
                <td className="border p-3 flex justify-center gap-2">
                  {/* Edit Button */}
                  <button
                    className="bg-blue-500 text-white px-3 py-2 rounded flex items-center gap-1 hover:bg-blue-700 transition"
                    onClick={() => handleEdit(product)}
                  >
                    <FiEdit />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded flex items-center gap-1 hover:bg-red-700 transition"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            {/* Name Input */}
            <label className="block mb-2">
              <span className="text-gray-700">Name:</span>
              <input
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
            </label>

            {/* Price Input */}
            <label className="block mb-2">
              <span className="text-gray-700">Price:</span>
              <input
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
            </label>

            {/* Stock Input */}
            <label className="block mb-4">
              <span className="text-gray-700">Stock:</span>
              <input
                type="number"
                name="stock"
                value={currentProduct.stock}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
            </label>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
