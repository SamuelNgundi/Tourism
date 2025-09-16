import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import EngagementsPage from './pages/EngagementsPage';
import EventsPage from './pages/EventsPage';
import InfoPage from './pages/InfoPage';
import CompetitionPage from './pages/CompetitionPage';
import BlogPage from './pages/BlogPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/engagements" element={<EngagementsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/competition" element={<CompetitionPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
