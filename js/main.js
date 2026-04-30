import { SetUrl } from "../utils/SetUrl.js";
import { LoginForm } from "./auth/loginForm.js";
import { displayHome } from "./home/displayHome.js";

let virifyTocken=localStorage.getItem("token")
SetUrl("/")
if  (virifyTocken){
    displayHome()
}else{
    LoginForm()
}