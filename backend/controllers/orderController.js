import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';


//global variables
const currency = 'USD'
const deliveryCharges=10
// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// Placing orders using COD method
const placeOrder = async (req, res) => {
    try {
        console.log("Request Body:", req.body);  // Debugging log

        const { userId, items, amount, address } = req.body;

        // 🛠 Ensure required fields are present
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const orderData = {
            userId,
            items,
            amount,
            address, 
            paymentMethod: "COD",
            payment: false,
            status: "Order Placed",
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Clearing user's cart after order placement
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error("Order Placement Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Placing orders using Stripe method
const placeOrderStrip = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin}=req.headers ;
        const orderData = {
            userId,
            items,
            amount,
            address, 
            paymentMethod: "Stripe",
            payment: false,
          
            date: Date.now()
        };
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items= items.map((item)=>({
            price_data:{
                    currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price *100
            },
        quantity: item.quantity
        }
        ))
        line_items.push({
            price_data:{
                currency:currency,
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount:deliveryCharges *100
        },
    quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
             success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
             cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//verify stripe
const verifyStripe=async(req,res)=>{
    const {orderId,success,userId}=req.body 
    try {
        if (success==="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true })
            await userModel.findByIdAndUpdate(userId,{cartData:{
            }})
            res.json({success:true})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
        res.json({ success: true, orders });
    } catch (error) {
        console.error("Order Fetch Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// User orders data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;  // Consider using URL params (e.g., /orders/:userId)
        const orders = await orderModel.find({ userId });

        res.json({ success: true, data: orders }); // ✅ Send valid response
    } catch (error) {
        console.error("User Orders Fetch Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update order status from admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Order ID and status are required." });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        console.log("Update Status Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { verifyStripe,placeOrder, placeOrderStrip, placeOrderRazorpay, allOrders, userOrders, updateStatus };
