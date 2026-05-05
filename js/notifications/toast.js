function getToastHost() {
  let toastHost = document.querySelector(".notif-sec");

  if (!toastHost) {
    toastHost = document.createElement("div");
    toastHost.className = "notif-sec";
    document.body.appendChild(toastHost);
  }

  return toastHost;
}

export function renderToast({ className, text, duration, iconMarkup }) {
  const toastHost = getToastHost();
  const toast = document.createElement("div");

  toast.className = className;
  toast.innerHTML = /* html */ `
    <div>${iconMarkup}</div>
    <p>${text}</p>
    <div class="close">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0" class="toast-close-icon">
        <path class="p1" d="m50 12.582c-20.625 0-37.418 16.793-37.418 37.418s16.793 37.418 37.418 37.418 37.418-16.793 37.418-37.418-16.793-37.418-37.418-37.418zm0 70.668c-18.332 0-33.25-14.918-33.25-33.25s14.918-33.25 33.25-33.25 33.25 14.918 33.25 33.25-14.918 33.25-33.25 33.25z" />
        <path class="p2" d="m61.73 38.27c-0.8125-0.8125-2.125-0.8125-2.9375 0l-8.793 8.793-8.793-8.793c-0.8125-0.8125-2.125-0.8125-2.9375 0s-0.8125 2.125 0 2.9375l8.793 8.793-8.793 8.793c-0.8125 0.8125-0.8125 2.125 0 2.9375 0.41797 0.41797 0.9375 0.60547 1.4805 0.60547s1.0625-0.20703 1.4805-0.60547l8.7695-8.793 8.793 8.793c0.41797 0.41797 0.9375 0.60547 1.4805 0.60547 0.54297 0 1.0625-0.20703 1.4805-0.60547 0.8125-0.8125 0.8125-2.125 0-2.9375l-8.8164-8.793 8.793-8.793c0.8125-0.8125 0.8125-2.125 0-2.9375z" />
      </svg>
    </div>
  `;

  const removeToast = () => {
    toast.remove();

    if (toastHost.children.length === 0) {
      toastHost.remove();
    }
  };

  toastHost.appendChild(toast);
  setTimeout(removeToast, duration);
  toast.querySelector(".close")?.addEventListener("click", removeToast);
}
