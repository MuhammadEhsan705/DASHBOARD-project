import { redirect } from "react-router-dom";

export async function  lougoutAction() {
    return redirect("/");
    
}