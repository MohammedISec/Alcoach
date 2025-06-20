import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }
    const formData = await req.formData();

    // Extract fields from formData
    const name = formData.get("name");
    const amazonLink = formData.get("amazonLink");
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const files = formData.getAll("images");
    const offerPrice = formData.get("offerPrice") || null;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No images Uploaded" },
        { status: 400 }
      );
    }
    const result = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return new Promise((resolve, reject) => {
          const uploadResult = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                // console.error("Cloudinary upload error:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          uploadResult.end(buffer);
        });
      })
    );
    const image = result.map((result) => result.secure_url);

    await connectDB();
    const newProduct = await Product.create({
      userId,
      name,
      amazonLink,
      description,
      image,
      price: Number(price),
      offerPrice: offerPrice ? Number(offerPrice) : null,
      category,
      date: Date.now(),
    });
    return NextResponse.json(
      { success: true, message: "Product added successfully", newProduct },
      { status: 201 }
    );
  } catch (error) {
    NextResponse.json({ success: false, message: error.message });
  }
}
