import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Category from "@/app/models/Category";

mongoose.connect(process.env.MONGO_URI!, {
  // No need to specify useNewUrlParser and useUnifiedTopology
});
export async function GET() {
  const categories = await Category.find();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newCategory = new Category(data);
  await newCategory.save();
  return NextResponse.json(newCategory);
}
