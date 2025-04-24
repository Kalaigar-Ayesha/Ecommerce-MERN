import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App"; // Ensure backendUrl is defined properly
import { toast } from "react-toastify";

const Add = () => {
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const token = localStorage.getItem("token"); // Ensure token is retrieved properly

  const handleSizeClick = (size) => {
    setSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg p-6 border border-gray-200"
    >
      {/* Upload Image Section */}
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700 mb-4">Upload Image</p>
        <div className="grid grid-cols-2 gap-4">
          {[setImage1, setImage2, setImage3, setImage4].map((setImage, i) => (
            <label
              key={i}
              htmlFor={`image${i + 1}`}
              className="flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer transition hover:border-orange-500 hover:bg-gray-200 w-full h-32"
            >
              {([image1, image2, image3, image4][i] && (
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={URL.createObjectURL([image1, image2, image3, image4][i])}
                  alt="Upload Preview"
                />
              )) || (
                <img
                  className="w-12 h-12"
                  src={assets.upload_area}
                  alt="Upload"
                />
              )}
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (i === 0) setImage1(file);
                  if (i === 1) setImage2(file);
                  if (i === 2) setImage3(file);
                  if (i === 3) setImage4(file);
                }}
                type="file"
                id={`image${i + 1}`}
                hidden
              />
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Product Description */}
      <div className="mb-4">
        <p className="mb-2 text-gray-700 font-medium">Product Description</p>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none h-24"
          placeholder="Write product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Product Category & Sub Category */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="mb-2 text-gray-700 font-medium">Product Category</p>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2 text-gray-700 font-medium">Sub Category</p>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            required
          >
            <option value="">Select Sub Category</option>
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
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      {/* Product Size Selection */}
      <div className="mb-4">
        <p className="mb-2 text-gray-700 font-medium">Product Size</p>
        <div className="flex flex-wrap gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => handleSizeClick(size)}
              className={`px-4 py-2 border rounded-lg cursor-pointer transition ${
                sizes.includes(size)
                  ? "border-orange-500 bg-orange-100 text-orange-700"
                  : "border-gray-300 hover:border-orange-500 hover:bg-gray-200 text-gray-700"
              } font-medium`}
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
          checked={bestSeller}
          onChange={(e) => setBestSeller(e.target.checked)}
        />
        <label
          htmlFor="bestSellers"
          className="text-gray-700 font-medium cursor-pointer"
        >
          Add to Best Seller
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition duration-200"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
