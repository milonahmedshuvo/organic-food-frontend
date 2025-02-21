"use client";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-green-800 text-white w-64 md:w-72 p-5 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform md:relative md:translate-x-0 flex-shrink-0`}
      >
        <div className="flex items-center gap-2">
          <FaLeaf size={24} />
          <h2 className="text-2xl font-bold">Organic Admin</h2>
        </div>

        <nav className="mt-5 space-y-4">
          <a href="/dashboard" className="block p-2 rounded hover:bg-green-600">
            Dashboard
          </a>
          <a
            href="/dashboard/products"
            className="block p-2 rounded hover:bg-green-600"
          >
            Products
          </a>
          <a
            href="/dashboard/orders"
            className="block p-2 rounded hover:bg-green-600"
          >
            Orders
          </a>
          <a
            href="/dashboard/customers"
            className="block p-2 rounded hover:bg-green-600"
          >
            Customers
          </a>
          <a
            href="/dashboard/addProduct"
            className="block p-2 rounded hover:bg-green-600"
          >
            Add Product
          </a>
        </nav>
      </aside>




      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">

        {/* Navbar */}
        <div className="flex items-center justify-between md:hidden p-4 bg-white shadow-md">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded bg-green-800 text-white"
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>




        {/* Content Wrapper with Scroll */}
        <div className="flex-1 overflow-auto p-6 mt-10">{children}</div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
