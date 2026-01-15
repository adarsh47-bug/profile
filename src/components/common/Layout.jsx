import Navbar from './Navbar';
import Footer from './Footer';
import SkipNavigation from './SkipNavigation';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <SkipNavigation />
      <Navbar />
      <main id="main-content" className="flex-grow pt-16 md:pt-20 focus:outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
