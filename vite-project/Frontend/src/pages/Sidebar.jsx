import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaBitbucket } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";

function Sidebar({ collapsed, isOpen }) {
  return (
    <div
      className={`fixed top-[70px] left-0 h-[calc(100vh-70px)] 
        bg-white dark:bg-zinc-900 shadow-md transition-all duration-400 
        ${collapsed ? 'w-[5%]' : 'w-[70%] md:w-[20%]'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}  z-20 md:translate-x-0`}
    >
      <ul className="pt-4 text-black dark:text-white">
        <li className="p-4">
          <NavLink
            to="/"
            className="flex items-center font-bold gap-2 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <MdSpaceDashboard className="w-5 h-5" />
            {!collapsed && 'Dashboard'}
          </NavLink>
        </li>

        <li className="p-4">
          <NavLink
            to="/order"
            className="flex items-center font-bold gap-2 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <MdOutlineShoppingCart className="w-5 h-5" />
            {!collapsed && 'Order'}
          </NavLink>
        </li>

        <li className="p-4">
          <NavLink
            to="/product"
            className="flex items-center font-bold gap-2 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaBitbucket className="w-5 h-5" />
            {!collapsed && 'Product'}
          </NavLink>
        </li>

        <li className="p-4">
          <NavLink
            to="/customer"
            className="flex items-center font-bold gap-2 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaAddressCard className="w-5 h-5" />
            {!collapsed && 'Customer'}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
