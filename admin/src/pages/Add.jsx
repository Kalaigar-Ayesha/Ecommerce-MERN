import React from 'react';
import { assets } from '../assets/assets';

const Add = () => {
  return (
    <form className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg p-6 border border-gray-200">
      {/* Image Upload Section */}
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700 mb-4">Upload Image</p>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }, (_, i) => (
            <label
              key={i}
              htmlFor={`image${i + 1}`}
              className="flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer transition hover:border-orange-500 hover:bg-gray-200"
            >
              <img src={assets.upload_area} alt="Upload Icon" className="w-16 h-16 mb-2" />
              <input type="file" id={`image${i + 1}`} hidden />
              <span className="text-sm text-gray-600">Click to Upload</span>
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="mb-4">
        <p className="mb-2 text-gray-700 font-medium">Product Name</p>
        <input 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" 
          type="text" 
          placeholder="Enter product name" 
          required 
        />
      </div>

      {/* Product Description */}
      <div className="mb-4">
        <p className="mb-2 text-gray-700 font-medium">Product Description</p>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none h-24" 
          placeholder="Write product description" 
          required 
        />
      </div>

      {/* Product Category & Sub Category */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="mb-2 text-gray-700 font-medium">Product Category</p>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >  
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option> 
          </select>
        </div>
        <div>
          <p className="mb-2 text-gray-700 font-medium">Sub Category</p>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >  
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option> 
          </select>
        </div>
      </div>

      {/* Product Price */}
      <div className="mb-6">
        <p className="mb-2 text-gray-700 font-medium">Product Price</p>
        <input 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" 
          type="number" 
          placeholder="Enter price"
          required
        />
      </div>
    {/* Product Size */}
<div className="mb-4">
  <p className="mb-2 text-gray-700 font-medium">Product Size</p>
  <div className="flex flex-wrap gap-3">
    {["S", "M", "L", "XL", "XXL"].map((size) => (
      <div
        key={size}
        className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer transition hover:border-orange-500 hover:bg-gray-200 text-gray-700 font-medium"
      >
        {size}
      </div>
    ))}
  </div>
</div>

{/* Best Seller Checkbox */}
<div className="mb-6 flex items-center gap-2">
  <input
    type="checkbox"
    id="bestSellers"
    className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-2 focus:ring-orange-500 cursor-pointer"
  />
  <label htmlFor="bestSellers" className="text-gray-700 font-medium cursor-pointer">
    Add to Best Seller
  </label>
</div>

      {/* Submit Button */}
      <div className="text-center">
        <button 
          type="submit" 
          className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition duration-200"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default Add;
