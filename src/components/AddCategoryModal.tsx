import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

// Modal.setAppElement("#__next"); // For accessibility, necessary with react-modal

type AddCategoryModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onAddCategory: (category: string) => void;
};

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onRequestClose,
  onAddCategory,
}) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Make the POST request to save the new category
    await axios.post("/api/categories", { name: categoryName });
    onAddCategory(categoryName);

    // Reset form field and close the modal
    setCategoryName("");
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Category"
      className="category-modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="modal-title">Add Category</h2>
      <form onSubmit={handleSubmit} className="add-category-form">
        <input
          type="text"
          placeholder="Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Save
        </button>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
