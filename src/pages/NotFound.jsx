import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const AlertCircleIcon = getIcon('AlertCircle');
  const HomeIcon = getIcon('Home');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
    >
      <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <AlertCircleIcon size={40} />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
      
      <p className="text-lg text-surface-600 dark:text-surface-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      
      <Link
        to="/"
        className="btn-primary flex items-center space-x-2"
      >
        <HomeIcon size={20} />
        <span>Return to Home</span>
      </Link>

      <div className="mt-16 max-w-md">
        <div className="p-4 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20">
          <p className="text-sm text-surface-700 dark:text-surface-300">
            Need assistance? Contact our support team at <span className="text-primary font-medium">support@medisync.com</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;