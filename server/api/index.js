import express from 'express';
import cors from 'cors';

const app = express();

// In-memory stores (resets on cold start)
let statsData = {};
let settingsData = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
};

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/api/stats', (req, res) => {
  res.json(statsData);
});

app.post('/api/stats', (req, res) => {
  statsData = req.body;
  res.json({ success: true, data: statsData });
});

app.get('/api/settings', (req, res) => {
  res.json(settingsData);
});

app.post('/api/settings', (req, res) => {
  settingsData = { ...settingsData, ...req.body };
  res.json({ success: true, data: settingsData });
});

export default app;