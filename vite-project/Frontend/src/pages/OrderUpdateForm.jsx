import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "./supabasedatafetch";
import { toast } from "react-toastify";

function OrderUpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    item: "",
    amount: "",
    promo: "",
    customer: "",
    delayed: false,
    status: "",
  });

  const [originalData, setOriginalData] = useState(null);

  
  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", (id))
        .single();

      if (error) {
        toast.error("Error fetching order");
        console.error("Fetch error:", error);
      } else {
        console.log("Fetched order:", data);

        const formattedData = {
          item: data.item || "",
          amount: data.amount || "",
          promo: data.promo || "",
          customer: data.customer || "",
          delayed: data.delayed ?? false,
          status: data.status || "",
        };

        setFormdata(formattedData);
        setOriginalData(formattedData);
      }
    };

    fetchOrder();
  }, [id]);

  const handlechange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("orders")
      .update(formdata)
      .eq("id", (id));

    if (error) {
      toast.error("Order update failed");
      console.error("Update error:", error);
    } else {
      toast.success("Order updated successfully");
      navigate("/order");
    }
  };

  const handlereset = () => {
    if (originalData) {
      setFormdata(originalData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-7 bg-white dark:bg-zinc-900 shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Update Order
      </h2>

      <form onSubmit={handlesubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="item"
          value={formdata.item}
          onChange={handlechange}
          placeholder="Item"
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
        />
        <input
          type="number"
          name="amount"
          value={formdata.amount}
          onChange={handlechange}
          placeholder="Total Amount"
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
        />
        <input
          type="text"
          name="promo"
          value={formdata.promo}
          onChange={handlechange}
          placeholder="Promo Code"
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
        />
        <input
          type="text"
          name="customer"
          value={formdata.customer}
          onChange={handlechange}
          placeholder="Customer"
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
        />

        <div className="flex items-center space-x-2 sm:col-span-2">
          <input
            type="checkbox"
            id="delayed"
            name="delayed"
            checked={formdata.delayed}
            onChange={handlechange}
            className="w-4 h-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-zinc-600 rounded"
          />
          <label htmlFor="delayed" className="text-sm text-gray-700 dark:text-gray-300">
            Is Delayed
          </label>
        </div>

        <input
          type="text"
          name="status"
          value={formdata.status}
          onChange={handlechange}
          placeholder="Packing/Shipping/Delivered"
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 sm:col-span-2"
        />

        <div className="flex justify-end space-x-3 sm:col-span-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white dark:text-gray-100 px-6 py-2 rounded-md shadow"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handlereset}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-md shadow"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderUpdateForm;
