import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Auto-clean stale service workers and legacy localStorage cache
if (typeof window !== 'undefined') {
  // 1. Unregister any development service workers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    }).catch(() => {});
  }

  // 2. Clear old browser caches if any
  if ('caches' in window) {
    caches.keys().then((names) => {
      for (const name of names) {
        caches.delete(name);
      }
    }).catch(() => {});
  }

  // 3. Schema migration: purge legacy prototype keys
  const CURRENT_SCHEMA = 'v1.0.3';
  if (localStorage.getItem('littleaura_schema_version') !== CURRENT_SCHEMA) {
    const legacyKeys = [
      'littleaura_child',
      'littleaura_medical',
      'littleaura_growth',
      'littleaura_daily_care',
      'littleaura_children_list',
      'littleaura_active_child_id',
      'littleaura_theme',
      'littleaura_notifications',
      'littleaura_timeline'
    ];
    legacyKeys.forEach(k => localStorage.removeItem(k));
    localStorage.setItem('littleaura_schema_version', CURRENT_SCHEMA);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
