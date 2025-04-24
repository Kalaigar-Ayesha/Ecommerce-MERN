import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/asserts";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
// import Stripe from 'stripe';

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    for (let key in formData) {
      if (!formData[key].trim()) {
        toast.error(`Please enter ${key}`);
        return;
      }
    }

    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemId));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      // Ensure cart is not empty
      if (orderItems.length === 0) {
        toast.error("Your cart is empty!");
        return;
      }
   
      let totalAmount = getCartAmount() + delivery_fee;
      if (!totalAmount || totalAmount <= 0) {
        toast.error("Invalid total amount.");
        return;
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount,
      };
      

      switch (method) {
        case "cod":
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
            headers: { token },
          });

          if (response.data.success) {
            setCartItems({});
            toast.success("Order placed successfully!");
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
          case 'stripe':
            const responseStripe= await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{token}})
            if (responseStripe.data.success) {
              const{session_url}= responseStripe.data
              window.location.replace(session_url)
            }
            else{
              toast.error(responseStripe.data.message)
            }
            break;
        default:
          toast.error("Invalid payment method");
          break;
      }
    } catch (error) {
      console.error("Order Error:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input className="border border-gray-300 rounded py-1.5 px-3 w-full" type="text" name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First Name" />
          <input className="border border-gray-300 rounded py-1.5 px-3 w-full" type="text" name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last Name" />
        </div>
        <input className="border border-gray-300 rounded py-1.5 px-3 w-full" type="email" name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email Address" />
        <input className="border border-gray-300 rounded py-1.5 px-3 w-full" type="text" name="street" value={formData.street} onChange={onChangeHandler} placeholder="Street" />
        <div className="flex gap-3">
          <input className="border border-gray-300 rounded py-1.5 px-3 w-full" type="text" name="city" value={formData.city} onChange={onChangeHandler} placeholder="City" />
          <input className="border border-gray-300 rounded py-1.5 px-3 w-full" type="text" name="state" value={formData.state} onChange={onChangeHandler} placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input className="border border-gray-300 rounded py-1.5 px-3 w-full" type="number" name="zipcode" value={formData.zipcode} onChange={onChangeHandler} placeholder="ZipCode" />
          <input className="border border-gray-300 rounded py-1.5 px-3 w-full" type="text" name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country" />
        </div>
        <input className="border border-gray-300 rounded py-1.5 px-3 w-full" type="number" name="phone" value={formData.phone} onChange={onChangeHandler} placeholder="Phone" />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment method selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            
            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm rounded-md">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
