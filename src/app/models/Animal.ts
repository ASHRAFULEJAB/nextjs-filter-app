import mongoose, { Schema, model, models } from "mongoose";

const animalSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const Animal = models.Animal || model("Animal", animalSchema);

export default Animal;
