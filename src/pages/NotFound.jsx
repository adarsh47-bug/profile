import { useNavigate } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import Button from '../components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-9xl font-bold text-slate-200 dark:text-slate-800">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSearch className="w-20 h-20 text-slate-400 dark:text-slate-600 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/')}
            icon={FaHome}
          >
            Back to Home
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => navigate('/#projects')}
              className="px-4 py-2 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => navigate('/#experience')}
              className="px-4 py-2 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => navigate('/#achievements')}
              className="px-4 py-2 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Achievements
            </button>
            <button
              onClick={() => navigate('/#contact')}
              className="px-4 py-2 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
