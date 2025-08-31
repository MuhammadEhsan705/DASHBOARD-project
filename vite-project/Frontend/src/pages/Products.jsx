import React from 'react';
import { product } from './Productpageone';
import Product from './Product';


function Products() {
  return (
    <>
      {/* -----------heading---------- */}
      <div className='flex justify-center items-center'>
        <div className="flex justify-between p-7">
          <h1 className="font-bold text-5xl text-black dark:text-white">Product</h1>

        </div>

       
      </div>

     
      <div className=" justify-center grid md:grid-cols-3 gap-4">
        {product.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </>
  );
}

export default Products;
