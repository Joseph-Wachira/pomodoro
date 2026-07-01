const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchHealth = () => fetch(`${API_BASE}/health`).then(res => res.json());
export const fetchStats = () => fetch(`${API_BASE}/stats`).then(res => res.json());
export const saveStats = (stats) =>
  fetch(`${API_BASE}/stats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stats),
  }).then(res => res.json());
export const fetchSettings = () => fetch(`${API_BASE}/settings`).then(res => res.json());
export const saveSettings = (settings) =>
  fetch(`${API_BASE}/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  }).then(res => res.json());