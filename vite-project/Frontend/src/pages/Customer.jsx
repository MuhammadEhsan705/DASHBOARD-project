import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GoPlus } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import { supabase } from './supabasedatafetch';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import {  toast } from 'react-toastify';
import { MdModeEditOutline } from "react-icons/md";

function Customer() {
  const navigate = useNavigate();
  const [Customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);






  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(filtered.map((Customers) => Customers.id));
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


  const fetchCustomers = async () => {
    let { data, error } = await supabase
      .from("Customers")
      .select("*");

    if (error) {
      console.error("Database error:", error);
    } else {
      setCustomers(data);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);




  const handleDeleteSelected = async () => {
    if (selected.length === 0) return;
    const { error } = await supabase
      .from("Customers")
      .delete()
      .in("id", selected);

    if (error) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete orders: " + error.message);
    } else {
      toast.success("Customers deleted successfully!");
      setSelected([]);
      setSelectAll(false);
      fetchCustomers();
    }
  };


  const filtered = Customers.filter(item =>
    item.name?.toLowerCase().includes(query.toLowerCase()) ||
    item.email?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="p-6 bg-white dark:bg-zinc-900 mt-8 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-black dark:text-white">


        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">CUSTOMER</h1>

          <button onClick={() => navigate("/customerform")} className="flex items-center justify-center font-bold bg-[#1976d2] px-3 py-2 sm:px-4 sm:py-2 text-white rounded-lg shadow transition-all duration-200">
            <GoPlus className="h-5 w-5 sm:h-6 sm:w-6 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm md:text-base">NEW CUSTOMER</span>
          </button>
        </div>

        {/* ---------------search---------------- */}
        <div className="bg-white dark:bg-zinc-800 mt-8 p-6 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-1 items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 h-10 w-full sm:max-w-md">
              <CiSearch className="text-gray-500 dark:text-gray-300" />
              <input
                className="bg-transparent border-0 outline-none flex-1 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                placeholder="Search customer..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            
          </div>
        </div>

        <div className='flex justify-end pr-14'>
          <button
            onClick={handleDeleteSelected}
          >
            <MdDelete className='w-5 h-5  ' />
          </button>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ">
            <thead className="bg-gray-100 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="w-4 h-4" onChange={handleSelectAll} checked={selectAll} />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Mobile</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Membership</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((Customers, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-zinc-700">
                  <td className="px-4 py-3"><input checked={selected.includes(Customers.id)}
                    onChange={() => handleSelectRow(Customers.id)} type="checkbox" className="w-4 h-4" />
                  </td>
                  <td className="px-4  py-3"> {Customers.name}</td>
                  <td className="px-4 py-3">{Customers.email}</td>
                  <td className="px-4 py-3">{Customers.mobile}</td>
                  <td className="px-4 py-3">
                    {Customers.membership === "VIP" && (
                      <span className="px-3 py-1 font-bold text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">VIP</span>
                    )}
                    {Customers.membership === "STANDARD" && (
                      <span className="px-3 py-1 font-bold text-xs rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">STANDARD</span>
                    )}
                  </td>
                  <td><button
                 onClick={() => navigate(`/updateformcustomer/${Customers.id}`)}>
                  <MdModeEditOutline className='h-5 w-5' />
                </button></td>
                  

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Customer;
