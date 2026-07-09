# LeetNotes

LeetNotes is a minimalist, high-performance Chrome SidePanel Extension designed to help developers record and organize algorithm strategies, space/time complexities, and code patterns directly within the browser while practicing on LeetCode.

The extension monitors active tab navigation to dynamically load and save notes mapped to the current problem slug, ensuring a seamless, distraction-free workflow.

---

## Features

- **Context-Aware Workspace**: Automatically parses the active tab's URL to retrieve and display notes specific to the loaded LeetCode problem.
- **Debounced Auto-Save**: Implements a 1-second input debounce mechanism to save notes automatically after typing pauses, preventing data loss.
- **Cross-Device Synchronization**: Leverages the `chrome.storage.sync` API to synchronize notes across all Chrome browser instances signed into the same user profile.
- **Obsidian Dark Theme**: Optimized user interface utilizing the Outfit font, subtle glassmorphic panels, and clear status light indicators (Saved, Saving, and Typing).
- **Core Utility Architecture**: Built with zero external library dependencies for lightweight execution and optimal page load speeds.

---

## Technical Stack

- **Architecture**: Google Chrome Manifest V3
- **APIs**: Chrome SidePanel API (`chrome.sidePanel`), Chrome Storage API (`chrome.storage.sync`), Chrome Tabs API (`chrome.tabs`)
- **Frontend**: Vanilla HTML5, Vanilla CSS3 (Grid & Flexbox), and Vanilla JavaScript (ES6+)

---

## Directory Structure

```
LeetNotes/
├── manifest.json      # Extension manifest configuration and permissions
├── background.js     # Service worker tracking active tabs and navigation events
├── content.js        # Content script detecting client-side SPA route transitions
├── sidepanel.html    # HTML structure of the sidebar notepad and welcome state
├── sidepanel.css     # Styling sheets for the glassmorphic dark-theme editor
├── sidepanel.js      # Controller handling debounced auto-save and sync operations
├── LICENSE           # Open-source MIT License
└── README.md         # Project documentation
```

---

## Installation Instructions

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/LeetNotes.git
   ```
2. **Open Chrome Extensions Manager**:
   Navigate to `chrome://extensions/` in Google Chrome.
3. **Enable Developer Mode**:
   Toggle the **Developer mode** switch in the top-right corner of the page.
4. **Load the Unpacked Directory**:
   - Click the **Load unpacked** button in the top-left corner.
   - Select the `LeetNotes` directory containing the `manifest.json` file.
5. **Launch the Sidebar Workspace**:
   - Click the **Extensions** (puzzle piece) icon in your Chrome toolbar.
   - Click the **LeetNotes** extension icon to open the SidePanel.

---

## Usage Guide

1. Navigate to any LeetCode problem page (for example, `https://leetcode.com/problems/two-sum/`).
2. The SidePanel will automatically detect the problem slug (`two-sum`), transition to the active workspace, and load any previously saved notes.
3. Type notes in the editor area. The status badge in the top-right corner displays the state:
   - **Typing** (Amber light): Input is currently being entered.
   - **Saving...** (Pulsing Blue light): Debounce period is active and save is queued.
   - **All changes saved** (Green light): Data is committed to cloud storage.
4. Switch to a different LeetCode problem; LeetNotes commits any remaining inputs and loads the notes for the new problem.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.
