import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/asserts";
import Related from "../components/Related";

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size,setSize]=useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
   <div  className="flex gap-12 sm:gap-12 flex-cil sm:flex-row">
      {/* product images */}
      <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex  sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
        
          {
            productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md" alt="" />
            ))
          }
        
      </div>
      <div className="w-full sm:w-[80%]">
        <img className="w-full h-auto rounded-md" src= {image}alt="" />

      </div>
      </div>
     {/* product info */}
<div className="flex-1">
  <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
  <div className="flex items-center gap-1 mt-2">
    <img src={assets.star_icon} alt="" className="w-4 h-4" />
    <img src={assets.star_icon} alt="" className="w-4 h-4" />
    <img src={assets.star_icon} alt="" className="w-4 h-4" />
    <img src={assets.star_icon} alt="" className="w-4 h-4" />
    <img src={assets.star_dull_icon} alt="" className="w-4 h-4" />
    <p className="pl-2">(122)</p>
  </div>
  <p className="mt-5 text-3xl font-medium">{currency} {productData.price}</p>
  <p className="mt-5 text-gray-500 md:w-w/5 ">{productData.description}</p>
  <div className="flex flex-col gap-4 my-8">
    <p>Select size</p>
    <div className="flex gap-2">
      {productData.sizes.map((item,index)=>(
        <button 
        onClick={() => setSize(item)} 
        className={`border py-2 px-4 bg-gray-100  rounded-md ${item === size ? 'border-orange-500' : ''}`} 
        key={index}
      >
        {item}
      </button>
      
      ))}

    </div>
  </div>
  <button onClick={()=>addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded-md">ADD TO CARD</button>
  <hr  className="mt-8 sm:w-4/5"/>
  <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
      <p>100% Original Products</p>
      <p>Cash on delivery is available on this product</p>
      <p>Easy return and exchange policy within 10 days</p>
  </div>
</div>

   </div>
   {/* description and review section */}
   <div className="mt-20">
    <div className="flex">
      <b className="border px-5 py-3 text-sm">Description</b>
      <p className="border px-5 py-3 text-sm">Reviews (122)</p>
    </div>
      <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
        <p>Our E-Commerce Website is a modern, user-friendly online shopping platform that provides customers with a seamless shopping experience. Built using the MERN stack (MongoDB, Express, React, Node.js), it ensures high performance, scalability, and a smooth user interface.</p>
        <p>This e-commerce platform is designed for businesses looking to expand their online presence and deliver a top-notch shopping experience to customers.</p>
      </div>
   </div>
   {/* display related products */}
   <Related 
  category={productData.category || "default"} 
  subCategory={productData.subCategory || "default"} 
/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product
