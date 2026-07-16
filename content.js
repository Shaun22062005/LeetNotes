let lastSlug = null;
let intervalId = null;

// Helper to extract slug from current location
function getSlugFromUrl() {
  const match = window.location.pathname.match(/\/problems\/([^/]+)/);
  return match ? match[1] : null;
}

// Check if slug has changed and notify background script
function checkSlug() {
  const currentSlug = getSlugFromUrl();
  if (currentSlug !== lastSlug) {
    lastSlug = currentSlug;
    chrome.runtime.sendMessage({
      type: "UPDATE_SLUG",
      slug: currentSlug
    }).catch(() => {});
  }
}


// Start polling for client-side SPA navigation
function init() {
  checkSlug();
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(checkSlug, 1000);
}

init();
