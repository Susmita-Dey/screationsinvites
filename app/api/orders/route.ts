import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// integrate razorpay payment gateway
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, variant } = await request.json();

    if (!productId || !variant) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await connectToDatabase();

    // create razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(variant.price * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        productId: productId.toString(),
        productName: variant.name,
        productDescription: variant.description,
      },
    });

    // create order to store in database
    const newOrder = await Order.create({
      userId: session.user.id,
      productId,
      variant,
      razorpayOrderId: order.id,
      amount: Math.round(variant.price * 100),
      status: "pending",
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      dbOrderId: newOrder._id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
