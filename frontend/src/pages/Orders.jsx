import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {}, 
        { headers: { token } }
      );

      console.log("API Response:", response.data); // ✅ Log response to debug structure

      if (response.data.success && Array.isArray(response.data.data)) { // ✅ Defensive check
        let allOrdersItem = [];

        response.data.data.forEach((order) => {
          if (!Array.isArray(order.items)) return; // ✅ Ensure order.items is an array
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status || "Processing",
              payment: order.payment || "Pending",
              paymentMethod: order.paymentMethod || "Unknown",
              date: order.date || "N/A",
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      } else {
        console.warn("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error loading orders:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token]);

  return (
    <div className='border-t pt-16 mb-20'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image?.[0]} alt={item.name || 'Product'} />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity || 1}</p>
                    <p>Size: {item.size || 'M'}</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className={`min-w-2 h-2 rounded-full ${item.status === "Shipped" ? "bg-green-500" : "bg-gray-400"}`}></p>
                  <p className='text-sm md:text-base'>{item.status || "Processing"}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
