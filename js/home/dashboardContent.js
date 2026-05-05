import { requestGraphql } from "../api/client.js";
import { queries } from "../api/queries.js";
import { showFailureToast } from "../notifications/failureToast.js";
import { formatXp } from "../utils/formatXp.js";
import { handleGraphqlError } from "../utils/handleGraphqlError.js";
import { getAppContainer } from "../utils/dom.js";
import { renderAuditsSection } from "./sections/auditsSection.js";
import { renderProgressSection } from "./sections/progressSection.js";

export async function renderDashboardContent() {
  const container = getAppContainer();

  if (!container) {
    return;
  }

  const bodyContainer = document.createElement("div");
  bodyContainer.className = "body-container";
  container.appendChild(bodyContainer);

  await renderOverviewSection(bodyContainer);
  await renderAuditsSection(bodyContainer);
  await renderProgressSection(bodyContainer);
}

async function renderOverviewSection(bodyContainer) {
  const section = document.createElement("div");
  section.className = "section";

  const identityResponse = await requestGraphql(queries.identity);
  if (!handleGraphqlError(identityResponse)) {
    return;
  }

  const xpResponse = await requestGraphql(queries.xpTotal);
  if (!handleGraphqlError(xpResponse)) {
    return;
  }

  const levelResponse = await requestGraphql(queries.level);
  if (!handleGraphqlError(levelResponse)) {
    return;
  }

  const transactionResponse = await requestGraphql(queries.transactions);
  if (!handleGraphqlError(transactionResponse)) {
    return;
  }

  const user = identityResponse?.data?.user?.[0];
  const level = levelResponse?.data?.transaction?.[0]?.amount;
  const totalXp = xpResponse?.data?.transaction_aggregate?.aggregate?.sum?.amount ?? 0;
  const transactions = transactionResponse?.data?.transaction ?? [];

  if (!user || level === undefined) {
    showFailureToast("We don't have enough profile information to render the dashboard.");
    return;
  }

  section.innerHTML = /* html */ `
    <div class="header-section">
      <div class="icon-user">
        <svg role="img" width="80px" height="80px" viewBox="0 0 24 24" aria-label="icon">
          <path fill="#4B79BF" fill-rule="evenodd" clip-rule="evenodd" d="M22.15 12c0 2.1-.63 4.05-1.72 5.67h-4.88v-1.6h4.07v-1.2h1.35V9.3h-1.35V7.77h-5.15l1.12-1.26a1.52 1.52 0 1 0-.7-.48l-1.55 1.74h-2.68L9.03 5.92a1.52 1.52 0 1 0-.65.54l1.15 1.3H4.55V9.3H3.2v5.59h1.35v1.18h4.07v1.6H3.57A10.15 10.15 0 1 1 22.15 12Zm-2.53-1.86v3.9h.5v-3.9h-.5Zm-.85-.85v-.67H5.4v6.6h13.37V9.29Zm-14.72.85h.5v3.9h-.5v-3.9ZM12 22.15c-3.13 0-5.93-1.41-7.79-3.63H19.8A10.13 10.13 0 0 1 12 22.15ZM23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0ZM9.46 16.23h5.25v1.35H9.46v-1.35Zm-.68-4.06a1.02 1.02 0 1 0 0-2.03 1.02 1.02 0 0 0 0 2.03Zm0 .85a1.86 1.86 0 1 0 0-3.73 1.86 1.86 0 0 0 0 3.73Zm7.79-1.87c0 .53-.46 1.02-1.1 1.02-.64 0-1.1-.49-1.1-1.02 0-.52.46-1.01 1.1-1.01.64 0 1.1.49 1.1 1.01Zm.85 0a1.9 1.9 0 0 1-1.95 1.87 1.9 1.9 0 0 1-1.95-1.87 1.9 1.9 0 0 1 1.95-1.86 1.9 1.9 0 0 1 1.95 1.86Zm-6.56 2.46-.16-.4-.79.3.36.94H14l.28-.98-.82-.23-.1.37h-2.5Zm-3.1-7.87a.68.68 0 1 0 0-1.36.68.68 0 0 0 0 1.36Zm8.98-.68a.68.68 0 1 1-1.36 0 .68.68 0 0 1 1.36 0Z"></path>
        </svg>
        <h1>${user.firstName} ${user.lastName}, <span>${user.login}</span></h1>
      </div>
      <div class="more-infos">
        <div class="level"><span>XP</span><h1>${formatXp(totalXp)}</h1></div>
        <div class="level"><span>Level</span><h1>${level}</h1></div>
      </div>
    </div>
    <div class="projects">
      <h2>Transactions (${transactions.length})</h2>
      <div class="project-table-container">
        <div class="project-header">
          <div class="col">Project</div>
          <div class="col">XP</div>
          <div class="col">Created At</div>
          <div class="col">Team Members</div>
          <div class="col">Team Leader</div>
        </div>
        <div class="project-body">
          ${transactions.map(buildTransactionRow).join("")}
        </div>
      </div>
    </div>
  `;

  bodyContainer.appendChild(section);
}

function buildTransactionRow(transaction) {
  const projectName = transaction.object?.name || "Unknown";
  const xp = formatXp(transaction.amount);
  const createdAt = new Date(transaction.createdAt).toLocaleDateString();
  const members = transaction.object?.progresses?.[0]?.group?.members || [];
  const leader = transaction.object?.progresses?.[0]?.group?.captainLogin || "--";

  return `
    <div class="project-row">
      <div class="col">${projectName}</div>
      <div class="col" style="color:${transaction.amount > 0 ? "#04E17A" : "#FF0000"}">${xp}</div>
      <div class="col">${createdAt}</div>
      <div class="col members">
        ${members
          .map(
            (member) => `
              <div class="userLogin">
                <a href="https://profile.zone01oujda.ma/profile/${member.userLogin}" target="_blank" rel="noreferrer">${member.userLogin}</a>
              </div>
            `,
          )
          .join("")}
      </div>
      <div class="col">${leader}</div>
    </div>
  `;
}
