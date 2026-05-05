import { APP_CONFIG } from "../config/appConfig.js";
import { getAppContainer, setActiveStylesheet } from "../utils/dom.js";
import { renderDashboardContent } from "./dashboardContent.js";
import { renderHeader } from "./header.js";

export function renderDashboard() {
  setActiveStylesheet(APP_CONFIG.pages.dashboardStylesheet);

  const container = getAppContainer();

  container?.removeAttribute("style");

  if (container) {
    container.innerHTML = "";
  }

  renderHeader();
  renderDashboardContent();
}
