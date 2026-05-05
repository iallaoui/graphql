import { requestGraphql } from "../../api/client.js";
import { queries } from "../../api/queries.js";
import { handleGraphqlError } from "../../utils/handleGraphqlError.js";

export async function renderAuditsSection(bodyContainer) {
  const responseData = await requestGraphql(queries.auditInfo);

  if (!handleGraphqlError(responseData)) {
    return;
  }

  const auditRatio = responseData?.data?.user?.[0]?.auditRatio ?? 0;
  const history = responseData?.data?.user?.[0]?.audits ?? [];
  const auditSection = document.createElement("div");

  auditSection.className = "audit-sec";
  auditSection.innerHTML = /* html */ `
    <div class="historyAudit">
      <h1>Audit Ratio: <span class="audit-ratio">${auditRatio.toFixed(1)}</span></h1>
      <div class="audit-list"></div>
    </div>
    <div class="Graph">
      <h1>Audits graph:</h1>
      <div class="perCentAudit">
        <div class="perSucced">
          <div></div>
          <p class="per"></p>
        </div>
        <div class="perFailed">
          <div></div>
          <p class="per"></p>
        </div>
      </div>
      <div class="drawing"></div>
    </div>
  `;

  bodyContainer.appendChild(auditSection);

  const auditList = auditSection.querySelector(".audit-list");

  history.forEach((audit) => {
    const auditItem = document.createElement("div");
    auditItem.className = `audit-item ${audit.closureType}`;
    auditItem.innerHTML = `
      <div class="audit-info">
        Leader: ${audit.group.captainLogin} | Project: ${audit.group.pathByPath.object.name} | Status: ${audit.closureType}
      </div>
    `;
    auditList?.appendChild(auditItem);
  });

  renderAuditChart(auditSection, history);
}

function renderAuditChart(auditSection, history) {
  const succeededCount = history.filter(
    (audit) => audit.closureType === "succeeded",
  ).length;
  const failedCount = history.length - succeededCount;
  const succeededPercent = history.length
    ? Math.round((succeededCount * 100) / history.length)
    : 0;
  const failedPercent = history.length
    ? Math.round((failedCount * 100) / history.length)
    : 0;

  auditSection.querySelector(".perSucced .per").textContent = `${succeededPercent}%`;
  auditSection.querySelector(".perFailed .per").textContent = `${failedPercent}%`;
  auditSection.querySelector(".drawing").innerHTML = /* html */ `
    <svg xmlns="http://www.w3.org/2000/svg" class="circle-graph" viewBox="0 0 70 70" style="height: auto;" preserveAspectRatio="xMidYMid meet">
      <circle r="35" cx="35" cy="35" class="succeed" />
      <path class="audit-failure-sector" fill="red" />
    </svg>
  `;

  const circle = auditSection.querySelector(".circle-graph circle");

  if (!circle) {
    return;
  }

  const radius = Number(circle.getAttribute("r"));
  const centerX = Number(circle.getAttribute("cx"));
  const centerY = Number(circle.getAttribute("cy"));

  drawAuditArc(
    auditSection.querySelector(".audit-failure-sector"),
    centerX,
    centerY,
    radius,
    failedPercent === 100 ? 99.99 : failedPercent,
  );
}

function drawAuditArc(pathElement, centerX, centerY, radius, percent) {
  if (!pathElement) {
    return;
  }

  const angle = (percent * 360) / 100;
  const radians = (angle * 2 * Math.PI) / 360;
  const x = centerX + radius * Math.sin(radians);
  const y = centerY - radius * Math.cos(radians);
  const largeArcFlag = angle > 180 ? 1 : 0;
  const pathData = `M${centerX},${centerY} L${centerX},${centerY - radius} A${radius},${radius} 0 ${largeArcFlag},1 ${x},${y} Z`;

  pathElement.setAttribute("d", pathData);
}
