import { renderLoginForm } from "./auth/loginForm.js";
import { APP_CONFIG } from "./config/appConfig.js";
import { renderDashboard } from "./home/dashboard.js";

window.history.replaceState(null, "", APP_CONFIG.pages.rootPath);

const token = localStorage.getItem("token");

if (token) {
  renderDashboard();
} else {
  renderLoginForm();
}
