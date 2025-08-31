import React, { useState } from 'react';
import { Form, Link, Outlet, useNavigate, useRouteLoaderData, NavLink } from 'react-router-dom';
import logo from "../assets/logo.png";
import profile from "../assets/profilelogin.jpg";
import Sidebar from '../pages/Sidebar';

import { MdOutlineMenu } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { FaGithub } from "react-icons/fa";

import { useDarkMode } from '../pages/ThemeContext';

function Rootlayout({ collapsed }) {
  const user = useRouteLoaderData("parent");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();


  const { darkMode, setDarkMode } = useDarkMode();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <main className="relative">
      <nav className='w-full h-20 bg-white dark:bg-zinc-900 shadow-md fixed top-0 left-0 z-50'>
        <div className='flex justify-between items-center px-6 h-full'>
          {user && (
            <div className='flex items-center gap-4'>
              <button
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsOpen(!isOpen);
                  } else {
                    setIsSidebarCollapsed(!isSidebarCollapsed);
                  }
                }}
              >
                <MdOutlineMenu className='h-7 w-7' />
              </button>

              <Link to='/' className='flex items-center gap-2'>
                <img src={logo} className='w-11' />
                <span className="hidden md:inline font-extrabold text-[#1976d2]">
                  React Demo
                </span>

              </Link>
            </div>
          )}

          <div className='flex items-center gap-4'>
            {user && (
              <button onClick={() => setDarkMode(!darkMode)}>
                <IoMdMoon className="h-7 w-7 text-gray-800 dark:text-yellow-400" />
              </button>
            )}

            <div className='relative'>
              {user && (
                <img
                  src={profile}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className='h-10 w-10 rounded-full cursor-pointer'
                />
              )}

              {showDropdown && (
                <div className='absolute right-0 mt-2 w-28 bg-white dark:bg-zinc-800 border rounded shadow z-50'>
                  {!user && (
                    <NavLink
                      to="/login"
                      className="block w-full px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-zinc-700"
                    >
                      Login
                    </NavLink>
                  )}

                  {user && (
                    <button
                      onClick={handleLogout}
                      className='block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-zinc-700 text-left'
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>

            <Link to="https://github.com/MuhammadEhsan705/DASHBOARD-project"><FaGithub className='h-7 w-7' /></Link>
          </div>
        </div>
      </nav>

      {user && <Sidebar collapsed={isSidebarCollapsed} isOpen={isOpen} />}

      <div
       className={`pt-[80px] px-6 transition-all duration-300 
        ${isSidebarCollapsed ? 'md:ml-[60px]' : 'md:ml-[20%]'} ml-0`}
      >
        <Outlet context={{ collapsed: isSidebarCollapsed }} />
      </div>
    </main>
  );
}

export default Rootlayout;
