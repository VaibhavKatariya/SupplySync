'use client'
import React, { useState, useEffect } from 'react';

const UpdateModal = ({ isOpen, closeModal, product, onUpdate }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setCategory(product.category || '');
      setPrice(product.price || 0);
      setStock(product.stock || 0);
    }
  }, [product]);

  const handleUpdate = async () => {
    const updatedProduct = { name, category, price, stock };
    await fetch(`/api/updateProduct/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    onUpdate(); // Refresh the product list
    closeModal(); // Close modal after updating
  };

  const handleDelete = async () => {
    setIsConfirmDeleteOpen(true); // Open confirmation modal
  };

  const confirmDelete = async () => {
    await fetch(`/api/deleteProduct/${product.id}`, {
      method: 'DELETE',
    });
    onUpdate(); // Refresh the product list
    setIsConfirmDeleteOpen(false); // Close confirmation modal
    closeModal(); // Close the update modal
  };

  const cancelDelete = () => {
    setIsConfirmDeleteOpen(false); // Close confirmation modal
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-[#1f2937] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Update Product</h2>
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
                onClick={handleUpdate}
              >
                Update Product
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Delete Product
              </button>
            </div>
          </form>
        </div>
      </div>

      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[#1f2937] p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Confirm Deletion</h2>
            <p className="text-white mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateModal;
