import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PomodoroProvider } from './context/PomodoroContext';
import Home from './pages/Home';
import DashboardPage from './pages/Dashboard';
import SettingsPage from './pages/Settings';
import Header from './components/Layout/Header';
import AmbientBackground from './components/Layout/AmbientBackground';

export default function App() {
  return (
    <BrowserRouter>
      <PomodoroProvider>
        <div className="relative min-h-screen overflow-hidden">
          <AmbientBackground />
          <Header />
          <main className="relative z-10 container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </PomodoroProvider>
    </BrowserRouter>
  );
}