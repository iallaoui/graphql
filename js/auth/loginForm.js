import { loginWithCredentials } from "../api/client.js";
import { APP_CONFIG } from "../config/appConfig.js";
import { renderDashboard } from "../home/dashboard.js";
import { showFailureToast } from "../notifications/failureToast.js";
import { showSuccessToast } from "../notifications/successToast.js";
import { getAppContainer, setActiveStylesheet } from "../utils/dom.js";

export function renderLoginForm() {
  setActiveStylesheet(APP_CONFIG.pages.loginStylesheet);

  const container = getAppContainer();

  if (!container) {
    return;
  }

  container.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  container.innerHTML = /* html */ `
    <form id="login-form">
      <img src="${APP_CONFIG.assets.logo}" alt="GraphQL01 logo">
      <p>Welcome, <span>back!</span></p>
      <div>
        <label for="login">Login</label>
        <input id="login" type="text" name="login" autocomplete="username" required placeholder="Type your username or email...">
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" name="password" autocomplete="current-password" placeholder="Type your password..." required>
      </div>
      <button type="submit">Submit</button>
    </form>
  `;

  container
    .querySelector("#login-form")
    ?.addEventListener("submit", handleLoginSubmit);
}

async function handleLoginSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const login = String(formData.get("login") || "").trim();
  const password = String(formData.get("password") || "");

  try {
    const { ok, data } = await loginWithCredentials(login, password);

    if (!ok) {
      showFailureToast(data?.error || "Login failed. Please verify your credentials.");
      return;
    }

    localStorage.setItem("token", data);
    showSuccessToast(`Welcome back, ${login}.`);
    renderDashboard();
  } catch (error) {
    showFailureToast(`There was an error. Please try again later: ${error}`);
  }
}
