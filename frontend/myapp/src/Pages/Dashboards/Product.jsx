
import React from 'react';

const Product = ({ products, onEdit, onDelete }) => {
  if (!products || products.length === 0) {
    return <div className="text-center text-gray-500 py-10">No products listed</div>;
  }

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {products.map((p) => {
          let bgColor = "bg-gray-100";
          let textColor = "text-gray-600";

          if (p.status === "In Stock") {
            bgColor = "bg-green-100";
            textColor = "text-green-600";
          } else if (p.status === "Low Stock") {
            bgColor = "bg-yellow-100";
            textColor = "text-yellow-600";
          } else if (p.status === "Out of Stock") {
            bgColor = "bg-red-100";
            textColor = "text-red-600";
          }

          return (
            <div
              key={p._id}
              className="w-full max-w-xs bg-white border p-4 rounded-lg shadow flex flex-col items-center"
            >
              <img
                src={p.image ? `http://localhost:3000/uploads/${p.image}` : 'https://via.placeholder.com/150'}
                
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h4 className="font-semibold mt-2 text-center w-full">{p.productname}</h4>
              <p className="text-sm text-center w-full">₹{p.price}</p>
              <p className="text-sm text-center w-full">Quantity: {p.stockQuantity}</p>
              {p.category && (
                <p className="text-sm text-gray-600 text-center w-full">
                  Category: {p.category}
                </p>
              )}
              <p className={`text-sm font-semibold text-center w-full px-2 py-1 rounded-full ${bgColor} ${textColor}`}>
                {p.status || "Unknown"}
              </p>
              <p className="text-xs text-gray-500 mb-2 text-center w-full">{p.description}</p>

              <div className="flex justify-center gap-3 w-full mt-2">
                <button
                  onClick={() => onEdit(p)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
