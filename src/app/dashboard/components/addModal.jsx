import React, { useState } from 'react';

const AddModal = ({ isOpen, closeModal, user, onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleAddProduct = async () => {
    try {
      const response = await fetch('/api/addProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({
          name,
          category,
          price: parseFloat(price),
          stock: parseInt(stock),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      await response.json(); // Ensure server response is processed

      if (onAdd) {
        onAdd();
        setName('');
        setCategory('');
        setPrice(0);
        setStock(0);
      }

      closeModal(); // Close modal after adding product
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-[#1f2937] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Add New Product</h2>
        <form>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Product Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Category</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Price</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Stock</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
