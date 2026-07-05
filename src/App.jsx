import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ErrorBoundary, SEO, StructuredData } from './components/common';
import ScrollToTop from './components/common/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const EducationPage = lazy(() => import('./pages/EducationPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Roblox "Joining Game..." Loading Screen
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0F0F0F',
      fontFamily: "'Nunito', sans-serif",
      padding: '2rem',
    }}>
      {/* Roblox-style loading panel */}
      <div style={{
        background: '#1A1A1A',
        border: '3px solid #3A3A3A',
        borderRadius: 12,
        padding: '2.5rem 3rem',
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 8px 0 rgba(0,0,0,0.6)',
        textAlign: 'center',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.5rem', color: '#E8192C', letterSpacing: '0.15em', marginBottom: 8, textTransform: 'uppercase' }}>
            Roblox
          </p>
          <h2 style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.8rem', color: '#F2F2F2', margin: 0 }}>
            Joining Game...
          </h2>
        </div>

        {/* Spinner dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: '1.5rem' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 10, height: 10,
              borderRadius: '50%',
              background: '#E8192C',
              animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          height: 14,
          background: '#242424',
          border: '2px solid #3A3A3A',
          borderRadius: 7,
          overflow: 'hidden',
          marginBottom: '1rem',
        }}>
          <div className="load-bar" style={{
            height: '100%',
            background: 'linear-gradient(90deg, #E8192C, #ff4060)',
            borderRadius: 5,
            boxShadow: '0 0 10px rgba(232,25,44,0.6)',
          }} />
        </div>

        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.8rem', color: '#666', margin: 0 }}>
          Loading portfolio assets...
        </p>
      </div>

      <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary showSupport>
      <Router>
        <SEO />
        <StructuredData type="Person" />
        <ScrollToTop />

        {/* Roblox Brick Background */}
        <div className="roblox-bg" aria-hidden="true" />

        {/* Floating Pixel Blocks */}
        <div className="pixel-block pixel-block-1" aria-hidden="true" />
        <div className="pixel-block pixel-block-2" aria-hidden="true" />
        <div className="pixel-block pixel-block-3" aria-hidden="true" />
        <div className="pixel-block pixel-block-4" aria-hidden="true" />
        <div className="pixel-block pixel-block-5" aria-hidden="true" />
        <div className="pixel-block pixel-block-6" aria-hidden="true" />

        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
