import React, { useState } from "react";

type AddCategoryProps = {
  onAddCategory: (category: string) => void;
};

const AddCategory: React.FC<AddCategoryProps> = ({ onAddCategory }) => {
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCategory(category);
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-category-form">
      <input
        type="text"
        placeholder="Add Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategory;
