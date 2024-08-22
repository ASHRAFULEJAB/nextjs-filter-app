import React, { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import AddAnimalModal from "./AddAnimalModal";

type FilterProps = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddCategory: (category: string) => void;
  onAddAnimal: (animal: {
    name: string;
    image: string;
    category: string;
  }) => void;
};

const Filter: React.FC<FilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onAddAnimal,
}) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAnimalModalOpen, setIsAnimalModalOpen] = useState(false);

  return (
    <div className="filter-wrapper">
      <div className="filter-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-button ${
              selectedCategory === category ? "selected" : ""
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="action-buttons">
        <button
          className="action-button"
          onClick={() => setIsCategoryModalOpen(true)}
        >
          Add Category
        </button>
        <button
          className="action-button"
          onClick={() => setIsAnimalModalOpen(true)}
        >
          Add Animal
        </button>
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onRequestClose={() => setIsCategoryModalOpen(false)}
        onAddCategory={onAddCategory}
      />

      {/* Add Animal Modal */}
      <AddAnimalModal
        isOpen={isAnimalModalOpen}
        onRequestClose={() => setIsAnimalModalOpen(false)}
        categories={categories}
        onAddAnimal={onAddAnimal}
      />
    </div>
  );
};

export default Filter;
