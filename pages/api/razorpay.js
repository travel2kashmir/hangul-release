// import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
  
});


export default async function POST(req,res) {
  console.log(`key:${process.env.RAZORPAY_API_KEY},value:${process.env.RAZORPAY_API_SECRET}`)
  try {
    const {amount,currency,booking_id} = req.body
    const payment_capture = 1;
    
    let tempAmt= amount*100
    const options = {
      "amount":tempAmt.toString() ,
      currency,
      "receipt": booking_id
    };
    console.log("payable amount is "+amount*100)
    const order = await instance.orders.create(options);
    // return NextResponse.json({ msg: "success", order });
    console.log(`Order is ${JSON.stringify(order)}`)
    return res.json({ msg: "success", order });
   
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    // return NextResponse.error(error.message);
    return res.json(error.message);
  }
}

