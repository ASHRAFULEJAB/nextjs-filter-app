import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

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
  const [uploading, setUploading] = useState(false); // State to manage upload status

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAnimalImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!animalImage) {
      console.error("No image selected");
      return;
    }

    setUploading(true);

    try {
      // Upload image to ImgBB using the API key from the environment variable
      const formData = new FormData();
      formData.append("image", animalImage);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData
      );

      const imageUrl = response.data.data.url; // Hosted image URL from ImgBB

      const newAnimal = {
        name: animalName,
        image: imageUrl, // Use the hosted image URL
        category: selectedCategory,
      };

      // Make the POST request to save the new animal with the hosted image URL
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/animals`,
        newAnimal
      );
      onAddAnimal(newAnimal);

      // Reset form fields and close the modal
      setAnimalName("");
      setAnimalImage(null);
      setSelectedCategory(categories[0]);
      onRequestClose();
    } catch (error) {
      console.error("Error uploading image or adding animal:", error);
    } finally {
      setUploading(false);
    }
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
        <button type="submit" className="submit-button" disabled={uploading}>
          {uploading ? "Uploading..." : "Create Animal"}
        </button>
      </form>
    </Modal>
  );
};

export default AddAnimalModal;
