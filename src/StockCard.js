import React from 'react';

function StockCard({ title, value }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default StockCard;