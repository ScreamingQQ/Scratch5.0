  async function fetchDataAndExecuteScripts() {
    try {
      const response = await fetch('/scripts/scratch-versions/5.0/data.json');
      const data = await response.json();
  
      const { files } = data;
  
      files.forEach(file => {
        chrome.scripting.executeScript({
          target: { allFrames: true },
          files: [`/scripts/scratch-versions/5.0/${file}`]
        });
      });
    } catch (error) {
      console.error('Error fetching data.json:', error);
    }
  }
  
  chrome.action.onClicked.addListener((tab) => {
    fetchDataAndExecuteScripts();
  });
  