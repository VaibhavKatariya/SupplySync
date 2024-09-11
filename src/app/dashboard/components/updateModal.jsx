'use client';
import { IconFidgetSpinner } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';

const UpdateModal = ({ isOpen, closeModal, product, onUpdate, user }) => {
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setPrice(product.price || '');
      setStock(product.stock || '');
    }
  }, [product]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock);

    if (!price || !stock) {
      setError('Price and stock are required.');
      return;
    }
    if (parsedPrice <= 0) {
      setError('Price must be greater than 0.');
      return;
    }
    if (parsedStock < 0) { // Allow stock to be zero
      setError('Stock must be zero or greater.');
      return;
    }

    try {
      const updatedProduct = { price: parsedPrice, stock: parsedStock };
      const response = await fetch(`/api/updateProduct/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      await response.json(); // Ensure server response is processed

      onUpdate(); // Refresh the product list
      closeModal(); // Close modal after updating
    } catch (error) {
      console.error('Error updating product:', error);
      setError('An error occurred while updating the product.');
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    setIsConfirmDeleteOpen(true); // Open confirmation modal
  };

  const confirmDelete = async () => {
    try {
      await fetch(`/api/deleteProduct/${product.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`,
        },
      });
      onUpdate(); // Refresh the product list
      setIsConfirmDeleteOpen(false); // Close confirmation modal
      closeModal(); // Close the update modal
    } catch (error) {
      console.error('Error deleting product:', error);
    }
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
            <div className="mb-4 cursor-not-allowed">
              <label className="block text-white text-sm font-bold mb-2">Product Name</label>
              <input
                type="text"
                className="cursor-not-allowed w-full p-2 rounded bg-gray-700 text-white"
                value={product?.name}
                disabled // Disable editing
              />
            </div>
            <div className="mb-4 cursor-not-allowed">
              <label className="block text-white text-sm font-bold mb-2">Category</label>
              <input
                type="text"
                className="cursor-not-allowed w-full p-2 rounded bg-gray-700 text-white"
                value={product?.category}
                disabled // Disable editing
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
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpdate}
              >
                {loading ? <IconFidgetSpinner className='animate-spin w-6 h-6 mx-auto' /> : "Update Product"}
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? <IconFidgetSpinner className='animate-spin w-6 h-6 mx-auto' /> : 'Delete Product'}
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
