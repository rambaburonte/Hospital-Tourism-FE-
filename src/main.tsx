// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// createRoot(document.getElementById("root")!).render(<App />);
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// ✅ iOS Fix: Unregister any lingering service workers (iOS often caches aggressively)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}

// ✅ iOS/Safari Compatibility: Delay rendering until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  }
});
