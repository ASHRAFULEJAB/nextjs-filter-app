"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "@/components/Filter";
import Category from "@/components/Category";
import AddCategoryModal from "@/components/AddCategoryModal";
import AddAnimalModal from "@/components/AddAnimalModal";

type Animal = {
  name: string;
  image: string;
  category: string;
};

export default function Home() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Land Animal");
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAnimalModalOpen, setIsAnimalModalOpen] = useState(false);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
        );
        const fetchedCategories = response.data.map(
          (category: { name: string }) => category.name
        );
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch animals from the backend
    const fetchAnimals = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/animals`
        );
        setAnimals(response.data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchCategories();
    fetchAnimals();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddCategory = (newCategory: string) => {
    setCategories([...categories, newCategory]);
  };

  const handleAddAnimal = (newAnimal: Animal) => {
    setAnimals([...animals, newAnimal]);
  };

  const filteredAnimals =
    selectedCategory === "Land Animal"
      ? animals
      : animals.filter((animal) => animal.category === selectedCategory);

  return (
    <div className="app-container">
      <div className="">
        <Filter
          categories={["Land Animal", ...categories]}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onAddCategory={handleAddCategory}
          onAddAnimal={handleAddAnimal}
        />
        <Category animals={filteredAnimals} />
      </div>

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onRequestClose={() => setIsCategoryModalOpen(false)}
        onAddCategory={handleAddCategory}
      />

      <AddAnimalModal
        isOpen={isAnimalModalOpen}
        onRequestClose={() => setIsAnimalModalOpen(false)}
        categories={categories}
        onAddAnimal={handleAddAnimal}
      />
    </div>
  );
}
