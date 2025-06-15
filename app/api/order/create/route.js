import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import { getAuth, User } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { address, items } = await req.json();

    if (!address || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid request data" },
        {
          status: 400,
        }
      );
    }

    const amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return acc + product.offerPrice * item.quantity;
    }, 0);

    await inngest.send({
      name: "order/created",
      data: {
        userId,
        items,
        amount: amount + Math.floor(amount * 0.02),
        address,
        date: Date.now(),
      },
    });

    const user = await User.findById(userId);
    user.cart = {};
    await user.save();

    return NextResponse.json(
      { success: true, message: "Order created successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ success: falsee, message: error.message });
  }
}
