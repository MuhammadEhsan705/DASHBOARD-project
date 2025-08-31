import React, { useEffect, useState } from 'react';
import { GoPlus } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

import { supabase } from './supabasedatafetch';
import { toast } from 'react-toastify';

function Order() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [query, setQuery] = useState("");

  // ✅ Fetch orders from Supabase
  const fetchOrders = async () => {
    let { data, error } = await supabase.from("orders").select("*");
    if (error) {
      console.error("Error fetching orders:", error);
    } else {
      setOrders(data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Handle Select All
  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(filtered.map((order) => order.id));
    }
    setSelectAll(!selectAll);
  };

 
  const handleSelectRow = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((sid) => sid !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  
  const handleDeleteSelected = async () => {
    if (selected.length === 0) return;
    const { error } = await supabase.from("orders").delete().in("id", selected);

    if (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete orders: " + error.message);
    } else {
      toast.success("Orders deleted successfully!");
      setSelected([]);
      setSelectAll(false);
      fetchOrders();
    }
  };

 
  const filtered = orders.filter((item) =>
    item.item?.toLowerCase().includes(query.toLowerCase()) ||
    item.customer?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="p-6 bg-white dark:bg-zinc-800 mt-8 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-black dark:text-white">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Orders</h1>

          <button
            onClick={() => navigate("/orderform")}
            className="flex items-center justify-center font-bold bg-[#1976d2] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow transition-all duration-200"
          >
            <GoPlus className="h-5 w-5 sm:h-6 sm:w-6 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm md:text-base">NEW ORDER</span>
          </button>
        </div>

        {/* Search + Filter */}
        <div className="mt-8 p-6 rounded-lg bg-gray-50 dark:bg-zinc-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-1 items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 h-10 w-full sm:max-w-md">
              <CiSearch className="text-gray-500 dark:text-gray-300" />
              <input
                className="bg-transparent border-0 outline-none flex-1 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
                type="text"
                placeholder=" Customer"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>


          </div>
        </div>

     
        <div className="flex justify-end pr-14">
          <button onClick={handleDeleteSelected}>
            <MdDelete className="w-5 h-5" />
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="min-w-[800px] w-full border-collapse">
                <thead className="bg-gray-100 dark:bg-zinc-700">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        onChange={handleSelectAll}
                        checked={selectAll}
                        type="checkbox"
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Order Number</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Item</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Total Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Promo Code</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Customer</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Is Delayed</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filtered.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-zinc-700">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={selected.includes(order.id)}
                          onChange={() => handleSelectRow(order.id)}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm">{order.id}</td>
                      <td className="px-4 py-3 text-sm">{order.item}</td>
                      <td className="px-4 py-3 text-sm font-medium">{order.amount}</td>
                      <td className="px-4 py-3 text-sm">{order.promo}</td>
                      <td className="px-4 py-3 text-sm">{order.customer}</td>
                      <td className="px-4 py-3 text-center">
                        {order.delayed ? (
                          <FaRegClock className="text-red-500 text-lg inline" />
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {order.status === "Packing" && (
                          <span className="px-3 py-1 text-xs rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300">
                            Packing
                          </span>
                        )}
                        {order.status === "Shipping" && (
                          <span className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                            Shipping
                          </span>
                        )}
                        {order.status === "Delivered" && (
                          <span className="px-3 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                            Delivered
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => navigate(`/orderupdateform/${order.id}`)}>
                          <MdModeEditOutline className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
