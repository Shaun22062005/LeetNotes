// DOM Element References
const activePanel = document.getElementById('active-panel');
const emptyPanel = document.getElementById('empty-panel');
const saveStatus = document.getElementById('save-status');
const saveStatusText = saveStatus.querySelector('.status-text');
const problemTitle = document.getElementById('problem-title');
const problemSlug = document.getElementById('problem-slug');
const notesTextarea = document.getElementById('notes-textarea');

let currentSlug = null;
let saveTimeout = null;

// Helper to update the saving status indicator UI
function updateStatus(state, text) {
  saveStatus.className = `status-badge ${state}`;
  saveStatusText.textContent = text;
}

// Save notes to chrome storage
function saveNotes() {
  if (!currentSlug) return;
  
  updateStatus('saving', 'Saving...');
  const text = notesTextarea.value;
  const storageKey = `leetcode_note_${currentSlug}`;
  
  chrome.storage.sync.set({ [storageKey]: text }, () => {
    updateStatus('saved', 'All changes saved');
  });
}

// Handle textarea keystrokes (with debouncing)
function handleInput() {
  updateStatus('typing', 'Typing...');
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveNotes, 1000); // 1-second debounce
}

// Format slug to human-readable title fallback
function formatSlugToTitle(slug) {
  if (!slug) return "";
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Update the UI state based on the current active problem
function updateUI(slug) {
  // If there's an ongoing debounce save, run it immediately before switching
  if (saveTimeout) {
    clearTimeout(saveTimeout);
    saveNotes();
  }

  if (slug) {
    // Show editor, hide empty state
    activePanel.classList.remove('hidden');
    emptyPanel.classList.add('hidden');
    
    // Only update contents if switching to a new problem
    if (currentSlug !== slug) {
      currentSlug = slug;
      
      // Update problem meta details
      problemTitle.textContent = formatSlugToTitle(slug);
      problemSlug.textContent = slug;
      
      // Load stored note
      notesTextarea.disabled = true;
      updateStatus('saving', 'Loading...');
      
      const storageKey = `leetcode_note_${currentSlug}`;
      chrome.storage.sync.get([storageKey], (result) => {
        notesTextarea.value = result[storageKey] || "";
        notesTextarea.disabled = false;
        updateStatus('saved', 'All changes saved');
        notesTextarea.focus();
      });
    }
  } else {
    // No active LeetCode problem page
    currentSlug = null;
    activePanel.classList.add('hidden');
    emptyPanel.classList.remove('hidden');
  }
}

// Bind event listeners
notesTextarea.addEventListener('input', handleInput);

// Request initial problem details on load
chrome.runtime.sendMessage({ type: "GET_CURRENT_SLUG" }, (response) => {
  if (chrome.runtime.lastError) {
    console.warn("Could not connect to background service worker. This is expected if the extension is reloaded.");
    return;
  }
  if (response && response.slug !== undefined) {
    updateUI(response.slug);
  }
});

// Listen for updates from background service worker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SLUG_CHANGED") {
    updateUI(message.slug);
  }
  sendResponse({ received: true });
});
