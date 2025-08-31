import { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from './supabasedatafetch';
import { toast } from 'react-toastify';

function Customerform() {
  const navigation = useNavigate();
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    mobile: "",
    membership: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Customers")
      .insert([formdata])
      .select();

    if (error) {
      console.error("Error inserting:", error);
    } else {
      console.log("customer inserted:", data);
      toast.success("Submitted Successfully!");
      navigation("/customer");
      setFormdata({
        name: "",
        email: "",
        mobile: "",
        membership: "",
      });
    }
  };

  const handlechange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormdata({
      ...formdata,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-7 bg-white dark:bg-zinc-900 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Customer Form
        </h2>
        <form
          onSubmit={handlesubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            value={formdata.name}
            onChange={handlechange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
          />
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handlechange}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
          />
          <input
            type="tel"
            name="mobile"
            value={formdata.mobile}
            onChange={handlechange}
            placeholder="Mobile Number"
            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
          />
          <select
            name="membership"
            value={formdata.membership}
            onChange={handlechange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
          >
            <option value="">Select Membership</option>
           <option value="STANDARD">Standard</option>
            <option value="VIP">VIP</option>
          </select>

          <div className="flex justify-end space-x-3 sm:col-span-2 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white dark:text-gray-100 px-6 py-2 rounded-md shadow"
            >
              Submit
            </button>
            <button
              onClick={() =>
                setFormdata({
                  name: "",
                  email: "",
                  mobile: "",
                  membership: "",
                })
              }
              type="reset"
              className="bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-md shadow"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Customerform;
