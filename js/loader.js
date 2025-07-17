// Create loader overlay
const loaderOverlay = document.createElement('div');
loaderOverlay.id = 'loader-overlay';
loaderOverlay.innerHTML = `
  <div class="loader-spinner"></div>
  <div class="loader-error" style="display:none; color:#fff; background:#e74c3c; padding:1rem 2rem; border-radius:8px; font-size:1.2rem; margin-top:1rem;">
    Page refused to load
  </div>
`;

// Loader styles
const style = document.createElement('style');
style.innerHTML = `
  #loader-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(255,255,255,0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  .loader-spinner {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px; height: 60px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
  }
`;
document.head.appendChild(style);
document.body.appendChild(loaderOverlay);

let loaded = false;
const minTime = 1000; // 1 second
const maxTime = 60000; // 60 seconds

const startTime = Date.now();

function removeLoader() {
  if (!loaded) {
    loaded = true;
    loaderOverlay.remove();
  }
}

// Remove loader after both: page loaded AND at least 1 second passed
window.addEventListener('load', () => {
  const elapsed = Date.now() - startTime;
  const wait = Math.max(0, minTime - elapsed);
  setTimeout(removeLoader, wait);
});

// Show error if loading takes more than 60 seconds
setTimeout(() => {
  if (!loaded) {
    loaderOverlay.querySelector('.loader-spinner').style.display = 'none';
    loaderOverlay.querySelector('.loader-error').style.display = 'block';
  }
}, maxTime);