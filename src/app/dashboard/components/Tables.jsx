import React from 'react';

const Tables = ({ productList, onEdit }) => {
  return (
    <table className="min-w-full bg-gray-800 border border-gray-700 rounded-md">
      <thead>
        <tr>
          <th className="py-2 px-4 text-left text-white">Name</th>
          <th className="py-2 px-4 text-left text-white">Category</th>
          <th className="py-2 px-4 text-left text-white">Price</th>
          <th className="py-2 px-4 text-left text-white">Stock</th>
          <th className="py-2 px-4 text-left text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
        {productList.map((product) => (
          <tr key={product.id}>
            <td className="py-2 px-4 text-white">{product.name}</td>
            <td className="py-2 px-4 text-white">{product.category}</td>
            <td className="py-2 px-4 text-white">{product.price}</td>
            <td className="py-2 px-4 text-white">{product.stock}</td>
            <td className="py-2 px-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                onClick={() => onEdit(product)} // Call onEdit with the product
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tables;
