"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { RootState } from "../../redux/store";
import { store } from "../../redux/store";
import { useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { removeProduct } from "@/redux/features/cart/cartSlice";
import toast from "react-hot-toast";

// Define Zod Schema for Form Validation
const checkoutSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().optional(),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(4, "ZIP Code is required"),
  shippingMethod: z.enum(["standard", "express", "overnight"]),
  paymentMethod: z.enum(["Online Payment", "Cash on Delivery"]),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const allState = useSelector((state: RootState) => state.cart);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // Handle Form Submission
  const onSubmit = async (data: CheckoutFormData) => {
    const orderData = {
      customer: "67b6152d33f7416c667be4e3",
      products: allState?.products.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      totalAmount: allState?.totaltk || 0,
      status: "Confirmed",
      paymentMethod: data.paymentMethod,
      phone: data.phone,
      city: data.city,
      zipCode: data.zipCode
    };

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("User is not authenticated");
      return;
    }



    try {
      const response = await fetch("http://localhost:5000/api/v1/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
      console.log("Order placed successfully:", data);
      toast.success("Order placed successfully")
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order")
    }




    console.log("Order Data:", orderData);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Billing & Shipping Section */}
        <div className="flex-1 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Billing & Shipping Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Full Name */}
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              {...register("fullName")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}

            {/* Email & Phone */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="flex-1">
                <label className="font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  {...register("phone")}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Address */}
            <label className="font-medium text-gray-700">Address</label>
            <input
              type="text"
              {...register("address")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            />

            {/* City & ZIP Code */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="font-medium text-gray-700">City</label>
                <input
                  type="text"
                  {...register("city")}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
                {errors.city && <p className="text-red-500">{errors.city.message}</p>}
              </div>
              <div className="flex-1">
                <label className="font-medium text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  {...register("zipCode")}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
                {errors.zipCode && <p className="text-red-500">{errors.zipCode.message}</p>}
              </div>
            </div>

            {/* Shipping Method */}
            <label className="font-medium text-gray-700">Shipping Method</label>
            <select
              {...register("shippingMethod")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="standard">Standard (5-7 days) - $5</option>
              <option value="express">Express (2-3 days) - $15</option>
              <option value="overnight">Overnight (1 day) - $25</option>
            </select>

            {/* Payment Method */}
            <label className="font-medium text-gray-700">Payment Method</label>
            <select
              {...register("paymentMethod")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="Online Payment">Online Payment</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
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
            {allState?.products.map((item) => (
              <div key={item._id} className="flex justify-between items-center gap-4 border-b pb-2">
                <div className="flex items-center gap-4">
                  <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-lg object-cover" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p className="font-bold">Total: ${item.quantity * item.price}</p>
                  </div>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 transition"
                  onClick={() => store.dispatch(removeProduct(item))}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xl font-bold text-green-700 mt-10">Total amount: ${allState?.totaltk}</p>
        </div>
      </div>
    </div>
  );
}
