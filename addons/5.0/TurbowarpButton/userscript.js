export default async function ({ addon, console, msg }) {
    const action = addon.settings.get("action");
    let playerToggled = false;
    let scratchStage;
    
    // Create a container for the TurboWarp iframe
    const twIframeContainer = document.createElement("div");
    twIframeContainer.className = "sa-tw-iframe-container";
  
    // Create the TurboWarp iframe and set its attributes
    const twIframe = document.createElement("iframe");
    twIframe.setAttribute("allowtransparency", "true");
    twIframe.setAttribute("allowfullscreen", "true");
    twIframe.setAttribute(
      "allow",
      "autoplay *; camera https://turbowarp.org; document-domain 'none'; fullscreen *; gamepad https://turbowarp.org; microphone https://turbowarp.org;"
    );
    twIframe.className = "sa-tw-iframe";
    twIframeContainer.appendChild(twIframe);
  
    // Create a button element for toggling TurboWarp
    const button = document.createElement("button");
    button.className = "button sa-tw-button";
    button.title = "TurboWarp";
  
    // Function to remove the TurboWarp iframe and reset the Scratch stage
    function removeIframe() {
      twIframeContainer.remove();
      scratchStage.style.display = "";
      button.classList.remove("scratch");
      playerToggled = false;
      button.title = "TurboWarp";
    }
  
    // Button click event handler
    button.onclick = async (e) => {
      const projectId = window.location.pathname.split("/")[2];
      let search = "";
  
      // Check if the project is private and fetch the project token if needed
      if (addon.tab.redux.state?.preview?.projectInfo?.public === false) {
        const projectToken = await (await fetch(
          `https://api.scratch.mit.edu/projects/${projectId}?current_time_to_get_updated_project_token=${Date.now()}`,
          { headers: { "x-token": await addon.auth.fetchXToken() } }
        )).json().project_token;
        search = `#?token=${projectToken}`;
      }
  
      // Open a new window if Control (or Command) key is pressed
      if (e.ctrlKey || e.metaKey) {
        window.open(
          `https://turbowarp.org/${projectId}${search}`,
          "_blank",
          "noopener,noreferrer"
        );
      } else {
        // Toggle the TurboWarp player iframe
        playerToggled = !playerToggled;
        if (playerToggled) {
          const username = await addon.auth.fetchUsername();
          const usp = new URLSearchParams();
          usp.set("settings-button", "1");
          if (username) usp.set("username", username);
  
          if (addon.settings.get("addons")) {
            const enabledAddons = await addon.self.getEnabledAddons("player");
            usp.set("addons", enabledAddons.join(","));
          }
  
          const fullscreenBackground =
            document.documentElement.style.getPropertyValue("--editorDarkMode-fullscreen") || "white";
          usp.set("fullscreen-background", fullscreenBackground);
  
          const iframeUrl = `https://turbowarp.org/${projectId}/embed?${usp}${search}`;
          twIframe.src = "";
          scratchStage.parentElement.prepend(twIframeContainer);
          twIframe.contentWindow.location.replace(iframeUrl);
  
          scratchStage.style.display = "none";
          button.classList.add("scratch");
          button.title = "Scratch";
          addon.tab.traps.vm.stopAll();
        } else {
          removeIframe();
        }
      }
    };
  
    let showAlert = true;
    while (true) {
      // Wait for the "See Inside" button to appear
      const seeInside = await addon.tab.waitForElement(".see-inside-button", {
        markAsSeen: true,
        reduxCondition: (state) => state.scratchGui.mode.isPlayerOnly,
      });
  
      // Add click event listener to the "See Inside" button
      seeInside.addEventListener("click", function seeInsideClick(event) {
        if (!playerToggled || !showAlert) return;
  
        if (confirm(msg("confirmation"))) {
          showAlert = false;
        } else {
          event.stopPropagation();
        }
      });
  
      // Append the TurboWarp button to the Scratch page
      addon.tab.appendToSharedSpace({ space: "beforeRemixButton", element: button, order: 1 });
  
      // Get the Scratch stage element
      scratchStage = document.querySelector(".guiPlayer");
    }
  }
  