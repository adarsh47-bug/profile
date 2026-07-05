import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ErrorBoundary, SEO, StructuredData } from './components/common';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const EducationPage = lazy(() => import('./pages/EducationPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Web3 Loading Spinner
function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#030712' }}
    >
      <div className="text-center">
        {/* Neon hexagonal spinner */}
        <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 1.5rem' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: '#00f5ff',
              borderRightColor: '#a855f7',
              animation: 'spin 1s linear infinite',
              boxShadow: '0 0 20px rgba(0,245,255,0.4)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 8,
              borderRadius: '50%',
              border: '1px solid transparent',
              borderBottomColor: '#e879f9',
              borderLeftColor: '#00f5ff',
              animation: 'spin 1.5s linear infinite reverse',
              boxShadow: 'inset 0 0 12px rgba(168,85,247,0.3)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '50%',
              width: 8,
              height: 8,
              marginLeft: -4,
              marginTop: -4,
              borderRadius: '50%',
              background: '#00f5ff',
              boxShadow: '0 0 12px #00f5ff, 0 0 24px rgba(0,245,255,0.5)',
            }}
          />
        </div>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: '#00f5ff',
            textShadow: '0 0 8px rgba(0,245,255,0.5)',
          }}
        >
          LOADING...
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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
        {/* Web3 Background Layer */}
        <div className="web3-grid-bg" aria-hidden="true" />
        <div className="web3-orb web3-orb-1" aria-hidden="true" />
        <div className="web3-orb web3-orb-2" aria-hidden="true" />
        <div className="web3-orb web3-orb-3" aria-hidden="true" />
        <div className="scan-overlay" aria-hidden="true" />
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
