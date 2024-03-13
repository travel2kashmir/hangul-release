import Razorpay from "razorpay";
import crypto from "crypto";
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

export default async function POST(req, res) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;


    if (isAuthentic) {
        console.log("Payment is authentic")
    }
    else {
        return res.json({
            message: "fail"
        }, {
            status: 400,
        })

    }
    return res.json({
        message: "success",
        refrenceNumber: razorpay_payment_id
    }, {
        status: 200,
    })

}
