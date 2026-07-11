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

// Listen for click events to capture user gestures for opening the side panel automatically
document.addEventListener('click', (event) => {
  const currentSlug = getSlugFromUrl();
  if (currentSlug) {
    // User is on a problem page and clicked somewhere, request opening the side panel
    chrome.runtime.sendMessage({
      type: "OPEN_SIDEPANEL_REQUEST",
      slug: currentSlug
    }).catch(() => {});
  } else {
    // Check if the user clicked a link that points to a problem page
    const anchor = event.target.closest('a');
    if (anchor && anchor.href) {
      try {
        const urlObj = new URL(anchor.href);
        const match = urlObj.pathname.match(/\/problems\/([^/]+)/);
        if (match && match[1]) {
          chrome.runtime.sendMessage({
            type: "OPEN_SIDEPANEL_REQUEST",
            slug: match[1]
          }).catch(() => {});
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }
});

// Start polling for client-side SPA navigation
function init() {
  checkSlug();
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(checkSlug, 1000);
}

init();
