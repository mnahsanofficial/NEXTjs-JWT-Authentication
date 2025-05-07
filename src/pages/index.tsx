import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to AuthApp</h1>
      <p className="text-xl text-gray-600 mb-8">
        {user ? `Hello, ${user.name}!` : 'Please login or register to continue'}
      </p>
      <div className="space-x-4">
        {user ? (
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;