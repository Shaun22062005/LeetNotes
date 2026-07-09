# LeetNotes 📝

LeetNotes is a minimalist, high-performance Chrome SidePanel Extension designed for developers who want to keep track of their algorithms, complexities, and code strategies directly on LeetCode. 

As you navigate between problems, the extension dynamically changes context—saving and loading problem-specific notes automatically without interrupting your LeetCode layout.

---

## ✨ Features

- **Problem-Specific Context Switching**: Silently monitors your active tab's URL. When you land on any LeetCode problem, LeetNotes loads your notes for that specific problem.
- **Auto-Save with Debouncing**: Never worry about losing progress. Edits save automatically 1 second after you stop typing.
- **Cross-Device Sync**: Built using `chrome.storage.sync` to sync your notes across all browsers linked to your Google Account.
- **Obsidian Dark Aesthetic**: A responsive dark-theme design utilizing the Outfit typography, neon accent indicators, and glassmorphic panels.
- **Distraction-Free Editing**: Stripped of complex setup and AI clutter to keep you focused on coding.

---

## 🛠️ Tech Stack & API Usage

- **Manifest V3**: Using modern service workers and Chrome SidePanel APIs.
- **Chrome Storage API**: Utilizes `chrome.storage.sync` for serverless state persistence.
- **Vanilla JS & CSS Grid/Flexbox**: Zero external library dependencies, ensuring the extension is ultra-lightweight and lightning-fast.

---

## 📂 Project Directory Structure

```
LeetNotes/
├── manifest.json      # Extension metadata, permissions & definitions
├── background.js     # Service worker tracking active tabs & navigation changes
├── content.js        # Script injected in LeetCode to monitor client-side SPA routing
├── sidepanel.html    # Layout structures for the sidebar workspace & empty state
├── sidepanel.css     # Glassmorphic dark styling, neon borders, and animations
├── sidepanel.js      # Notepad controller (auto-save debounce, storage read/write)
├── LICENSE           # Open-source MIT License
└── README.md         # Documentation
```

---

## 🚀 How to Install and Load (Unpacked Extension)

Since LeetNotes is currently in developer format, you can easily load it into Google Chrome:

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/LeetNotes.git
   ```
2. **Open Extensions Page**:
   In Google Chrome, navigate to: `chrome://extensions/`.
3. **Turn on Developer Mode**:
   Toggle the **Developer mode** switch in the top-right corner.
4. **Load the Extension**:
   - Click the **Load unpacked** button in the top-left corner.
   - Select the `LeetNotes` directory containing the `manifest.json`.
5. **Open Side Panel**:
   - Click the **Extensions** (puzzle piece) icon in the Chrome toolbar.
   - Click **LeetNotes** (you can pin it for quick access).
   - The side panel will slide out alongside your browser.

---

## 🎮 How to Use

1. **Open LeetCode**: Go to any problem, e.g., [leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/).
2. **Write Notes**: The side panel will detect the problem slug `two-sum` and present the workspace. Type your notes.
3. **Watch the Status Badge**:
   - **Typing** (Amber light) indicates you are actively writing.
   - **Saving...** (Pulsing Blue light) indicates the save action is queued.
   - **All changes saved** (Green light) indicates notes are safely synced to your profile.
4. **Browse Problems**: Switch to another problem (e.g., *Add Two Numbers*). Your previous notes are saved, the editor clears, and loads the new problem's context automatically.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
