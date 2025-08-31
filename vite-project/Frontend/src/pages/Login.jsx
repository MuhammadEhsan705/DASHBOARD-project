import React from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';
import axios from "axios";
import { LOGIN_URL, supabase_key } from './constants';
import logo from "../assets/logo.png";

export async function loginLoader() {
  if ("user" in localStorage) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.access_token && user?.refresh_token) {
      return redirect("/");
    }
  }
  return null;
}

export async function loginAction({ request }) {
  const data = await request.formData();
  const credentials = {
    email: data.get("email"),
    password: data.get("password"),
  };

  try {
    const response = await axios.post(LOGIN_URL, credentials, {
      headers: {
        "apikey": supabase_key,
        "Content-Type": "application/json",
      },
    });

    const { access_token, refresh_token } = response.data;
    const user = { access_token, refresh_token };
    localStorage.setItem("user", JSON.stringify(user));

    return redirect("/");
  } catch (error) {
    const errRes = error.response?.data;

    let errMsg = "Something went wrong. Please try again.";
    if (error.response?.status === 400) {
      errMsg = errRes?.error_description || "Wrong username or password";
    } else {
      errMsg = errRes?.message || errRes?.error_description || error.message;
    }

    console.error("Login error:", errRes);
    return { error: errMsg };
  }
}

function Login() {
  const data = useActionData();

  return (
    <Form method="POST" action="/login">
      <div className="flex justify-center items-center h-screen bg-[#f6f7f8]">
        <div className="px-8 py-10 w-80 rounded-lg shadow-lg bg-white flex flex-col items-center gap-4">
          <img src={logo} alt="logo" className="w-20 h-20 mb-2" />

          <h1 className="font-bold text-lg text-[#1976d2] text-center"> React Demo </h1>
          <p className="text-gray-500 text-sm text-center">
            Welcome, please sign in to continue
          </p>

          <input
            type="email"
            name="email"
            placeholder="Type Gmail"
            autoComplete="off"
            className="w-full px-3 py-2 border rounded border-gray-300 outline-none text-black placeholder-gray-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            className="w-full px-3 py-2 border rounded border-gray-300 outline-none text-black placeholder-gray-400"
          />

          <label className="flex items-center gap-2 self-start text-sm text-black">
            <input type="checkbox" className="w-4 h-4 text-blue-600" />
            Remember me
          </label>

          <input
            type="submit"
            value="Sign In"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
          />


          {data?.error && (
            <p className="text-red-600 text-sm mt-2 text-center">
              {data.error}
            </p>
          )}
        </div>
      </div>
    </Form>
  );
}

export default Login;
