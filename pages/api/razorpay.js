
import Razorpay from "razorpay";
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
    const order = await instance.orders.create(options);
    return res.json({ msg: "success", order });
   
  } catch (error) {
    return res.json(error.message);
  }
}

