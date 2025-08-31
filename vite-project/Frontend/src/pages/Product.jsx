import React from 'react';

function Product({ id, image, name, price }) {
  return (
    <>
      <div className="rounded-2xl shadow-md p-4 w-60 text-center hover:shadow-lg transition bg-white dark:bg-zinc-900 dark:border dark:border-zinc-700">
        <img
          src={image}
          alt={name}
          className="w-56 h-56 object-cover rounded-3xl mx-auto"
        />
        <div className="mt-3">
          <p className="font-bold text-2xl text-black dark:text-white">{name}</p>
          <p className="text-gray-700 dark:text-gray-300">Price: {price}</p>
        </div>
      </div>
    </>
  );
}

export default Product;
