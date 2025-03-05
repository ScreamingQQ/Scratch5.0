// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchDataAndExecuteScripts') {
    fetchDataAndExecuteScripts();
  }
});

// Function to fetch data and execute scripts
async function fetchDataAndExecuteScripts() {
  try {
    const response = await fetch('addons/5.0/data.json');
    const data = await response.json();
    const { addons } = data;

    // Loop through each addon directory
    for (const addon of addons) {
      // Fetch the list of files in the addon directory
      const filesResponse = await fetch(`addons/5.0/${addon}/files.json`);
      const files = await filesResponse.json(); // Assuming this returns a list of files

      // Execute each file in the addon directory
      for (const file of files) {
        chrome.scripting.executeScript({
          target: { allFrames: true },
          files: [`addons/5.0/${addon}/${file}`],
        });
      }
    }
  } catch (error) {
    console.error('Error fetching data.json or executing scripts:', error);
  }
}
