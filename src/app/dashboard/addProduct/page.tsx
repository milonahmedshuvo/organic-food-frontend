"use client";
import { useState } from "react";

export default function AddProductPage() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    stock: "", // Added stock input
  });

  const [productList, setProductList] = useState<
    {
      name: string;
      price: string;
      image: string;
      description: string;
      stock: string;
    }[]
  >([]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.price ||
      !product.image ||
      !product.description ||
      !product.stock
    ) {
      alert("Please fill out all fields.");
      return;
    }
    setProductList([...productList, product]); // Add to product list
    setProduct({ name: "", price: "", image: "", description: "", stock: "" }); // Reset form
  };


  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter product name"
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block font-medium mb-1">Price ($)</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter product price"
          />
        </div>

        {/* Product Stock (New Input) */}
        <div>
          <label className="block font-medium mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter stock quantity"
          />
        </div>

        {/* Product Image URL */}
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Paste image URL"
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter product description"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>

      {/* Display Added Products */}
      {productList.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Product List</h3>
          <ul className="space-y-3">
            {productList.map((item, index) => (
              <li key={index} className="p-3 border rounded shadow">
                <p className="font-semibold">
                  {item.name} - ${item.price}
                </p>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 mt-2 rounded"
                />
                <p className="text-gray-600">{item.description}</p>
                <p className="text-green-700 font-bold">Stock: {item.stock}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
