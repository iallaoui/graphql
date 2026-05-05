export function getAppContainer() {
  return document.querySelector(".container");
}

export function setActiveStylesheet(href) {
  const stylesheetLink = document.getElementById("css-link");

  if (stylesheetLink) {
    stylesheetLink.href = href;
  }
}
