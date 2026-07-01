import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

let statsData = {};
let settingsData = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
};

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/stats', (req, res) => {
  res.json(statsData);
});

app.post('/stats', (req, res) => {
  statsData = req.body;
  res.json({ success: true, data: statsData });
});

app.get('/settings', (req, res) => {
  res.json(settingsData);
});

app.post('/settings', (req, res) => {
  settingsData = { ...settingsData, ...req.body };
  res.json({ success: true, data: settingsData });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});