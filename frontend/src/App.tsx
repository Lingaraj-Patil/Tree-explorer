import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import Stories from './pages/Stories';
import StoryView from './pages/StoryView';
import Task from './pages/Task';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Map from './pages/Map';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/stories/:id" element={<StoryView />} />
              <Route path="/task" element={<Task />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/map" element={<Map />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;