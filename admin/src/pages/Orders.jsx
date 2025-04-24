import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    if (!token) return;
  
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
  
      console.log("Fetched orders:", response.data.orders); // ✅ ADD HERE
  
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  

  // Handle order status change
  const statushandler = async (event, orderId) => {
    console.log("Updating status:", orderId, event.target.value); // ✅ ADD HERE
  
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-5 border-l-4 border-orange-500"
            >
              {/* Order ID Box - Updated Styling */}
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-md border border-gray-300 mb-4">
                <img src={assets.parcel_icon} alt="Parcel" className="w-5 h-5" />
                <p className="font-medium">Order ID: {order.id}</p>
              </div>

              {/* Items List */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-orange-600">Items</h3>
                <ul className="text-gray-700">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x {item.quantity}{" "}
                      <span className="text-sm text-gray-500">({item.size})</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Address */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-orange-600">Shipping Address</h3>
                <p className="text-gray-700">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-gray-600">{order.address.street}</p>
                <p className="text-gray-600">
                  {order.address.city}, {order.address.state}, {order.address.country}
                </p>
                <p className="text-gray-700 font-medium">Phone: {order.address.phone}</p>
              </div>

              {/* Order Details */}
              <div className="flex justify-between items-center bg-orange-50 p-3 rounded-md">
                <p className="text-gray-800">
                  Items: <span className="font-semibold">{order.items.length}</span>
                </p>
                <p className="text-gray-800">
                  Payment:{" "}
                  <span
                    className={`ml-1 px-2 py-1 rounded text-sm ${
                      order.paymentMethod ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {order.paymentMethod ? "Done" : "Pending"}
                  </span>
                </p>
                <p className="text-gray-800">Date: {new Date(order.date).toLocaleDateString()}</p>
                <p className="text-gray-900 font-semibold">
                  {currency}
                  {order.amount}
                </p>
              </div>

              {/* Order Status Dropdown */}
              <div className="mt-4">
                <label className="block text-gray-700 font-medium">Order Status</label>
                <select
                  value={order.status } 
                  onChange={(event) => statushandler(event, order._id)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
