// Create and style the sidebar
const sidebar = document.createElement('div');
sidebar.id = 'sidebar';
sidebar.style.position = 'fixed';
sidebar.style.top = '0';
sidebar.style.right = '-300px'; // Start offscreen
sidebar.style.width = '300px';
sidebar.style.height = '100%';
sidebar.style.backgroundColor = '#f1f1f1';
sidebar.style.boxShadow = '-2px 0 5px rgba(0,0,0,0.5)';
sidebar.style.transition = 'right 0.3s ease';
sidebar.style.zIndex = '9999';

// Create and style the close button
const closeButton = document.createElement('button');
closeButton.textContent = 'Close';
closeButton.style.position = 'absolute';
closeButton.style.top = '10px';
closeButton.style.right = '10px';
closeButton.style.backgroundColor = '#f44336';
closeButton.style.color = 'white';
closeButton.style.border = 'none';
closeButton.style.padding = '5px 10px';
closeButton.style.cursor = 'pointer';

// Create and style the options button
const optionsButton = document.createElement('button');
optionsButton.textContent = 'Options';
optionsButton.style.position = 'absolute';
optionsButton.style.top = '10px';
optionsButton.style.right = '80px';
optionsButton.style.backgroundColor = '#4CAF50';
optionsButton.style.color = 'white';
optionsButton.style.border = 'none';
optionsButton.style.padding = '5px 10px';
optionsButton.style.cursor = 'pointer';

// Append buttons to sidebar
sidebar.appendChild(closeButton);
sidebar.appendChild(optionsButton);
document.body.appendChild(sidebar);

// Slide in the sidebar
setTimeout(() => {
  sidebar.style.right = '0';
}, 100);

// Event listener for close button
closeButton.addEventListener('click', () => {
  sidebar.style.right = '-300px';
  setTimeout(() => {
    document.body.removeChild(sidebar);
  }, 300);
});

// Event listener for options button (Add your own functionality here)
optionsButton.addEventListener('click', () => {
  alert('Options clicked!');
});
