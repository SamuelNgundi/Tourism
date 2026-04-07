import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import EngagementsPage from './pages/EngagementsPage';
import EventsPage from './pages/EventsPage';
import InfoPage from './pages/InfoPage';
import CompetitionPage from './pages/CompetitionPage';
import BlogPage from './pages/BlogPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import PostEditor from './pages/admin/PostEditor';
import PostList from './pages/admin/PostList';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Analytics />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Header />
              <HomePage />
              <Footer />
            </>
          } />
          <Route path="/tours" element={
            <>
              <Header />
              <ToursPage />
              <Footer />
            </>
          } />
          <Route path="/engagements" element={
            <>
              <Header />
              <EngagementsPage />
              <Footer />
            </>
          } />
          <Route path="/events" element={
            <>
              <Header />
              <EventsPage />
              <Footer />
            </>
          } />
          <Route path="/info" element={
            <>
              <Header />
              <InfoPage />
              <Footer />
            </>
          } />
          <Route path="/competition" element={
            <>
              <Header />
              <CompetitionPage />
              <Footer />
            </>
          } />
          <Route path="/blog" element={
            <>
              <Header />
              <BlogPage />
              <Footer />
            </>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/posts" element={<PostList />} />
          <Route path="/admin/posts/new" element={<PostEditor />} />
          <Route path="/admin/posts/:id/edit" element={<PostEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
