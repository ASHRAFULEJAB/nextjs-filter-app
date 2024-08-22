import React, { useState } from "react";
import axios from "axios";

type AddAnimalProps = {
  categories: string[];
  onAddAnimal: (newAnimal: {
    name: string;
    image: string;
    category: string;
  }) => void;
};

const AddAnimal: React.FC<AddAnimalProps> = ({ categories, onAddAnimal }) => {
  const [animalName, setAnimalName] = useState("");
  const [animalImage, setAnimalImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAnimal = {
      name: animalName,
      image: animalImage,
      category: selectedCategory,
    };
    await axios.post("/api/animals", newAnimal);
    onAddAnimal(newAnimal);
  };

  return (
    <form onSubmit={handleSubmit} className="add-animal-form">
      <input
        type="text"
        placeholder="Animal Name"
        value={animalName}
        onChange={(e) => setAnimalName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Animal Image URL"
        value={animalImage}
        onChange={(e) => setAnimalImage(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button type="submit">Add Animal</button>
    </form>
  );
};

export default AddAnimal;
