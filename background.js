let activeSlug = null;

// Enable opening side panel on extension icon click
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("Error setting panel behavior:", error));

// Helper function to extract problem slug from a LeetCode URL
function extractSlug(url) {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("leetcode.com")) {
      const match = urlObj.pathname.match(/\/problems\/([^/]+)/);
      return match ? match[1] : null;
    }
  } catch (e) {
    // Ignore invalid URLs
  }
  return null;
}

// Update local active slug state and broadcast to active listeners
function updateSlug(slug) {
  if (activeSlug !== slug) {
    activeSlug = slug;
    broadcastSlug();
  }
}

// Broadcast the current slug to side panel
function broadcastSlug() {
  chrome.runtime.sendMessage({
    type: "SLUG_CHANGED",
    slug: activeSlug
  }).catch((err) => {
    // Suppress errors when side panel is closed
  });
}

// Listen to tab updates (e.g. URL changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.active) {
    const slug = extractSlug(changeInfo.url);
    updateSlug(slug);
  }
});

// Listen to tab activations (switching between tabs)
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab && tab.url) {
      const slug = extractSlug(tab.url);
      updateSlug(slug);
    }
  } catch (error) {
    console.error("Error retrieving tab details on activation:", error);
  }
});

// Listen for messages from content scripts or side panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_CURRENT_SLUG") {
    // Side panel requesting the initial slug state on load
    sendResponse({ slug: activeSlug });
  } else if (message.type === "UPDATE_SLUG") {
    // Content script reporting slug changes
    updateSlug(message.slug);
    sendResponse({ success: true });
  }
  return true; // Keep message channel open for async responses
});
