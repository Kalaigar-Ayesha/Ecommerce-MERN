import { createContext, useState } from "react";
import { products } from "../assets/asserts.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();


    // Optimized addToCart function
    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        setCartItems((prevCartItems) => ({
            ...prevCartItems,
            [itemId]: {
                ...prevCartItems[itemId],
                [size]: (prevCartItems[itemId]?.[size] || 0) + 1
            }
        }));
    };

    // Fixed getCartCnt function
    const getCartCnt = () => {
        let totalCnt = 0;
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                if (cartItems[item][size] > 0) {
                    totalCnt += cartItems[item][size]; // Fix: Accumulate correct count
                }
            }
        }
        return totalCnt;
    };

    const updateQuantity = (itemId, size, quantity) => {
        setCartItems((prevCartItems) => {
            const updatedCart = { ...prevCartItems };
    
            if (!updatedCart[itemId]) {
                updatedCart[itemId] = {};  
            }
    
            if (quantity > 0) {
                updatedCart[itemId][size] = quantity; 
            } else {
                delete updatedCart[itemId][size]; 
                if (Object.keys(updatedCart[itemId]).length === 0) {
                    delete updatedCart[itemId]; 
                }
            }
    
            return updatedCart;
        });
    };
    
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === String(items)); // Ensuring correct comparison
            if (!itemInfo) continue;
    
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            }
        }
        return totalAmount;
    };
    

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCnt,
        updateQuantity,
        getCartAmount,
        navigate
    };

    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
