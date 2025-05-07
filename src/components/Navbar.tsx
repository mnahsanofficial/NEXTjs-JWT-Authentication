import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary-600">
          AuthApp
        </Link>
        <div className="flex space-x-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-md ${router.pathname === '/dashboard' ? 'bg-primary-100 text-primary-600' : 'hover:text-primary-600'}`}
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`px-3 py-2 rounded-md ${router.pathname === '/login' ? 'bg-primary-100 text-primary-600' : 'hover:text-primary-600'}`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`px-3 py-2 rounded-md ${router.pathname === '/register' ? 'bg-primary-100 text-primary-600' : 'hover:text-primary-600'}`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;