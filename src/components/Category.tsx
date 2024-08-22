/* eslint-disable @next/next/no-img-element */
import React from "react";

type Animal = {
  name: string;
  image: string;
};

type CategoryProps = {
  animals: Animal[];
};

const Category: React.FC<CategoryProps> = ({ animals }) => {
  return (
    <div className="category-container">
      {animals.map((animal) => (
        <div key={animal.name} className="animal-card">
          <img src={animal.image} alt={animal.name} className="animal-image" />
          <p className="animal-name">{animal.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;
