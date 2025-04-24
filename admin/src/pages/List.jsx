import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`,{headers:{token}});
      if (response.data.success) {
        toast.success(response.data.message);
      await  fetchList(); // Refresh the list after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <p className="text-lg font-semibold text-gray-700 mb-4">All Products List</p>

      {/* Table */}
      <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <div className="grid grid-cols-5 bg-gray-100 p-3 font-semibold text-gray-700">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.length > 0 ? (
          list.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-5 p-3 border-t border-gray-200 items-center"
            >
              {/* Image */}
              <div className="flex justify-center">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
              </div>

              {/* Name */}
              <p className="text-gray-700">{product.name}</p>

              {/* Category */}
              <p className="text-gray-700">{product.category}</p>

              {/* Price */}
              <p className="text-gray-700 font-semibold">${product.price}</p>

              {/* Action */}
              <button
                onClick={() => handleDelete(product._id)}
                className="text-red-500 font-bold text-xl cursor-pointer hover:text-red-700 transition"
              >✖
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
