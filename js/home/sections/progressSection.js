import { requestGraphql } from "../../api/client.js";
import { queries } from "../../api/queries.js";
import { handleGraphqlError } from "../../utils/handleGraphqlError.js";

export async function renderProgressSection(bodyContainer) {
  const responseData = await requestGraphql(queries.skills);

  if (!handleGraphqlError(responseData)) {
    return;
  }

  const uniqueSkills = deduplicateSkills(responseData?.data?.transaction ?? []);
  const progressSection = document.createElement("div");

  progressSection.className = "progress-graph";
  progressSection.innerHTML = /* html */ `
    <h1>Best skills:</h1>
    <div class="progress-chart"></div>
  `;

  bodyContainer.appendChild(progressSection);
  drawSkillsChart(progressSection.querySelector(".progress-chart"), uniqueSkills);
}

function deduplicateSkills(skills) {
  const skillMap = new Map();

  skills.forEach((skill) => {
    if (!skillMap.has(skill.type)) {
      skillMap.set(skill.type, skill);
    }
  });

  return [...skillMap.values()];
}

function drawSkillsChart(chartContainer, skills) {
  if (!chartContainer) {
    return;
  }

  chartContainer.innerHTML = "";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 800 400");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.style.width = "100%";
  svg.style.height = "auto";
  chartContainer.appendChild(svg);

  appendAxis(svg);
  appendYAxisLabels(svg);

  const hoverText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  hoverText.setAttribute("x", 400);
  hoverText.setAttribute("y", 380);
  hoverText.setAttribute("text-anchor", "middle");
  hoverText.setAttribute("fill", "white");
  hoverText.setAttribute("font-size", "14");
  hoverText.setAttribute("font-family", "Arial, sans-serif");
  hoverText.setAttribute("font-weight", "bold");
  hoverText.textContent = "";
  svg.appendChild(hoverText);

  if (skills.length === 0) {
    return;
  }

  const xAxisWidth = 780 - 35;
  const yAxisHeight = 350 - 50;
  const barWidth = Math.min(40, (xAxisWidth / skills.length) * 0.8);
  const spacing = xAxisWidth / skills.length;

  skills.forEach((skill, index) => {
    const x = 35 + index * spacing + (spacing - barWidth) / 2;
    const barHeight = (skill.amount * yAxisHeight) / 100;
    const y = 350 - barHeight;
    const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    bar.setAttribute("x", x);
    bar.setAttribute("y", y);
    bar.setAttribute("width", barWidth);
    bar.setAttribute("height", barHeight);
    bar.setAttribute("fill", "#4A90E2");
    bar.setAttribute("stroke", "white");
    bar.setAttribute("stroke-width", "1");
    bar.style.cursor = "pointer";

    bar.addEventListener("mouseenter", () => {
      bar.setAttribute("fill", "#5BA0F2");
      hoverText.textContent = skill.type;
    });

    bar.addEventListener("mouseleave", () => {
      bar.setAttribute("fill", "#4A90E2");
      hoverText.textContent = "";
    });

    svg.appendChild(bar);

    const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    valueText.setAttribute("x", x + barWidth / 2);
    valueText.setAttribute("y", y - 5);
    valueText.setAttribute("text-anchor", "middle");
    valueText.setAttribute("fill", "white");
    valueText.setAttribute("font-size", "12");
    valueText.setAttribute("font-family", "Arial, sans-serif");
    valueText.textContent = `${skill.amount}%`;
    svg.appendChild(valueText);
  });
}

function appendAxis(svg) {
  const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  xAxis.setAttribute("x1", 35);
  xAxis.setAttribute("x2", 780);
  xAxis.setAttribute("y1", 350);
  xAxis.setAttribute("y2", 350);
  xAxis.setAttribute("stroke", "white");
  xAxis.setAttribute("stroke-width", "1");
  svg.appendChild(xAxis);

  const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  yAxis.setAttribute("x1", 35);
  yAxis.setAttribute("x2", 35);
  yAxis.setAttribute("y1", 50);
  yAxis.setAttribute("y2", 350);
  yAxis.setAttribute("stroke", "white");
  yAxis.setAttribute("stroke-width", "1");
  svg.appendChild(yAxis);
}

function appendYAxisLabels(svg) {
  const yAxisHeight = 350 - 50;

  ["25", "50", "75"].forEach((label) => {
    const yPosition = 350 - (Number(label) * yAxisHeight) / 100;
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    text.setAttribute("x", 30);
    text.setAttribute("y", yPosition + 5);
    text.setAttribute("text-anchor", "end");
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "12");
    text.setAttribute("font-family", "Arial, sans-serif");
    text.textContent = `${label}%`;
    svg.appendChild(text);
  });
}
