import connectDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const isSeller = authSeller(userId);

    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
