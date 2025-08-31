import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Rootlayout from "./layouts/Rootlayout";
import { Dashboard, Order, Products, Customer } from "./pages";
import { loginAction, loginLoader } from "./pages/Login";
import Login from "./pages/Login";
import { getuser } from "./Utilites/getuser";
import { lougoutAction } from "./pages/Lougout";

import { ThemeProvider } from "./pages/ThemeContext";
import OrdersForm from "./pages/OrdersForm";
import Customerform from "./pages/Customerform";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateForm from "./pages/UpdateForm";
import OrderUpdateForm from "./pages/OrderUpdateForm";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path="login" element={<Login />} action={loginAction} loader={loginLoader} />




      <Route path="/" element={<Rootlayout />} loader={getuser} id="parent">
        <Route index element={<Dashboard />} />
        <Route path="logout" action={lougoutAction} />
        <Route path="order" element={<Order />} />
        <Route path="product" element={<Products />} />
        <Route path="customer" element={<Customer />} />
        <Route path="orderform" element={<OrdersForm />} />
        <Route path="orderupdateform/:id" element={<OrderUpdateForm />} />

        <Route path="customerform" element={<Customerform />} />
        <Route path="updateformcustomer/:id" element={<UpdateForm />} />

      </Route>
    </>
  )
);

function App() {
  return (
    <ThemeProvider>
      <ToastContainer
        position={window.innerWidth < 768 ? "top-center" : "bottom-center"}
        newestOnTop
        autoClose={600}
      />

      <div className="bg-[#f6f7f8]  text-black dark:bg-zinc-900 dark:text-white min-h-screen transition-colors">

        <RouterProvider router={router} />

      </div>
    </ThemeProvider>


  );
}

export default App;
