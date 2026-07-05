import Navbar from './Navbar';
import Footer from './Footer';
import SkipNavigation from './SkipNavigation';
import { ScrollToTopButton } from '../ui';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
      <SkipNavigation />
      <Navbar />
      <main id="main-content" className="grow pt-16 md:pt-20 focus:outline-none">
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
