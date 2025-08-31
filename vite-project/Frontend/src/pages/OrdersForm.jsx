import React, { useState } from 'react';
import { supabase } from './supabasedatafetch';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

function OrdersForm() {
  const navigate = useNavigate();


  const [formdta, setFormdata] = useState({
    item: "",
    amount: "",
    promo: "",
    customer: "",
    delayed: false,
    status: "",
  });

  const handlechange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormdata({
      ...formdta,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("orders")
      .insert([formdta])
      .select();

    if (error) {
      console.error("Error inserting:", error);
      alert("Failed to add: " + error.message);

    } else {
      console.log("order inserted:", data);
      toast.success("Submitted Successfuly!");

      navigate("/order");

      setFormdata({
        item: "",
        amount: "",
        promo: "",
        customer: "",
        delayed: false,
        status: "",
      });


    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-7 bg-white dark:bg-zinc-900 shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Order Form
      </h2>

      <form onSubmit={handlesubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="item"
          value={formdta.item}
          onChange={handlechange}
          placeholder="Item"
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 
            rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
            bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
        />

        <input
          type="text"
          name="amount"
          value={formdta.amount}
          onChange={handlechange}
          placeholder="Total Amount"
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 
            rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
            bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
        />

        <input
          type="text"
          name="promo"
          value={formdta.promo}
          onChange={handlechange}
          placeholder="Promo Code"
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 
            rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
            bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
        />

        <input
          type="text"
          name="customer"
          value={formdta.customer}
          onChange={handlechange}
          placeholder="Customer"
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 
            rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
            bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
        />
        <input
          type="text"
          name="status"
          value={formdta.status}
          onChange={handlechange}
          placeholder="Packing/Shipping/Delivered"
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 
            rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
            bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
        />

        <div className="flex items-center space-x-2 sm:col-span-2">
          <input
            type="checkbox"
            id="delayed"
            name="delayed"
            checked={formdta.delayed}
            onChange={handlechange}
            className="w-4 h-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-zinc-600 rounded"
          />
          <label htmlFor="delayed" className="text-sm text-gray-700 dark:text-gray-300">
            Is Delayed
          </label>
        </div>

        <div className="flex justify-end space-x-3 sm:col-span-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
              text-white dark:text-gray-100 px-6 py-2 rounded-md shadow"
          >
            Submit
          </button>
          <button
            onClick={() =>
              setFormdata({
                item: "",
                amount: "",
                promo: "",
                customer: "",
                delayed: false,
                status: "",
              })
            }
            type="reset"
            className="bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 
              text-gray-700 dark:text-gray-200 px-6 py-2 rounded-md shadow"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrdersForm;
