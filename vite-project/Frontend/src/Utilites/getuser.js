import { redirect } from "react-router-dom";

export async function getuser() {
  if ("user" in localStorage) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.access_token && user?.refresh_token) {
      return user; 
    }
  }
  

  throw redirect("/login");
}
