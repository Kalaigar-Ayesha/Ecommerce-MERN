import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

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
      {/* product imagges */}
      <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex  sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
        <div>
          {
            productData.image.map((item,index)=>(
                <img src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt="" />
            ))
          }
        </div>
      </div>
      </div>
   </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
