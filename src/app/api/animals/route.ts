import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Animal from "@/app/models/Animal";

mongoose.connect(process.env.MONGO_URI!, {
  // No need to specify useNewUrlParser and useUnifiedTopology
});

export async function GET() {
  const animals = await Animal.find();
  return NextResponse.json(animals);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newAnimal = new Animal(data);
  await newAnimal.save();
  return NextResponse.json(newAnimal);
}
