"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

// Product types
export interface TProduct {
  name: string;
  price: number;
  stock: number;
  image: FileList;
  description: string;
  category: string;
}

// Validation schema
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  stock: z.number().min(0, "Stock must be a positive number"),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Image is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
});

export default function AddProductPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TProduct>({
    resolver: zodResolver(productSchema),
  });

  // Handle form submission
  const onSubmit = async (data: TProduct) => {
    if (!data.image || data.image.length === 0) {
      toast.error("Please provide an image");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("User is not authenticated");
      return;
    }



    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      // Upload Image to imgbb
      const imageResponse = await fetch(
        "https://api.imgbb.com/1/upload?key=1e1cb35e45fc37d4bfe6bd8a3ed195cc",
        {
          method: "POST",
          body: formData,
        }
      );

      const imageResult = await imageResponse.json();

      if (imageResult.success) {
        console.log("Image uploaded:", imageResult.data.url);

        // Prepare product data
        const productData = {
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category: data.category,
          image: imageResult.data.url,
        };

        // Send product data to the backend with the token
        const response = await fetch("http://localhost:5000/api/v1/product/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Include token in headers
          },
          body: JSON.stringify({ data: productData }),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success("Product added successfully!");
          reset();
        } else {
          toast.error(result.message || "Failed to add product");
        }
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            {...register("name")}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Product Price */}
        <div>
          <label className="block font-medium mb-1">Price ($)</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter product price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Product Stock */}
        <div>
          <label className="block font-medium mb-1">Stock</label>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter stock quantity"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>

        {/* Product Image Upload */}
        <div>
          <label className="block font-medium mb-1">Upload Image</label>
          <input
            type="file"
            {...register("image")}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Product Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            {...register("category")}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter product category"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Product Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter product description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
