import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Address from "@/models/Address";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextRequest({ success: false, message: "Unauthorized" });
    }
    await connectDB();
    Address.length;
    const orders = await Order.find({}).populate("address items.product");
    return NextRequest.json({
      success: true,
      orders,
    });
  } catch (error) {
    return NextRequest.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
