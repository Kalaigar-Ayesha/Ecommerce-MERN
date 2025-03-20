import { createContext, useState } from "react";
import { products } from "../assets/asserts.js";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

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

    const updateQuantity=async (itemId,size,quantity) => {
        let cartData=structuredClone(cartItems);
        cartData[itemId][size]=quantity;
        setCartItems(cartData);
    }

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
        updateQuantity
    };

    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
