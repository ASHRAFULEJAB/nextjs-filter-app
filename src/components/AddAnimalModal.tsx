import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

// Modal.setAppElement("#__next"); // For accessibility, necessary with react-modal

type AddAnimalModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  categories: string[];
  onAddAnimal: (animal: {
    name: string;
    image: string;
    category: string;
  }) => void;
};

const AddAnimalModal: React.FC<AddAnimalModalProps> = ({
  isOpen,
  onRequestClose,
  categories,
  onAddAnimal,
}) => {
  const [animalName, setAnimalName] = useState("");
  const [animalImage, setAnimalImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAnimalImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = "";

    if (animalImage) {
      // You would typically upload the image to a cloud service like AWS S3, Cloudinary, etc.
      // Here, we simulate the upload by creating an object URL (not suitable for production).
      imageUrl = URL.createObjectURL(animalImage);
    }

    const newAnimal = {
      name: animalName,
      image: imageUrl,
      category: selectedCategory,
    };

    // Make the POST request to save the new animal
     try {
       await axios.post(
         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/animals`,
         newAnimal
       );
       onAddAnimal(newAnimal);
     } catch (error) {
       console.error("Error adding animal:", error);
     }
    // onAddAnimal(newAnimal);

    // Reset form fields and close the modal
    setAnimalName("");
    setAnimalImage(null);
    setSelectedCategory(categories[0]);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Animal"
      className="animal-modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="modal-title">Add Animal</h2>
      <form onSubmit={handleSubmit} className="add-animal-form">
        <input
          type="text"
          placeholder="Animal Name"
          value={animalName}
          onChange={(e) => setAnimalName(e.target.value)}
          className="input-field"
        />
        <div className="upload-section">
          <input
            type="text"
            placeholder="Image"
            value={animalImage ? animalImage.name : ""}
            readOnly
            className="input-field"
          />
          <label htmlFor="upload" className="upload-label">
            upload
          </label>
          <input
            id="upload"
            type="file"
            onChange={handleImageUpload}
            className="upload-input"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-field"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit" className="submit-button">
          Create Animal
        </button>
      </form>
    </Modal>
  );
};

export default AddAnimalModal;
