import { APP_CONFIG } from "../config/appConfig.js";
import { renderLoginForm } from "./loginForm.js";

export function logoutUser() {
  localStorage.removeItem("token");
  window.history.replaceState(null, "", APP_CONFIG.pages.rootPath);
  renderLoginForm();
}
