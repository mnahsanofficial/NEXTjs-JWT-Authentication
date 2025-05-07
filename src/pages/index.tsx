import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const HomePage = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {user ? `Welcome back, ${user.name}!` : 'Welcome to Our Platform'}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {user 
              ? 'You are now logged in and can access all features.'
              : 'Join thousands of satisfied users today.'}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {user ? (
              <>
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Go to Dashboard
                </button>
                <button 
                  onClick={() => router.push('/profile')}
                  className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  View Profile
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/register"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                >
                  Get Started
                </Link>
                <Link 
                  href="/login"
                  className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-center"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          
          {!user && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Easy to Use',
                  description: 'Intuitive interface designed for everyone',
                  icon: '👍'
                },
                {
                  title: 'Secure',
                  description: 'Your data is always protected',
                  icon: '🔒'
                },
                {
                  title: 'Powerful',
                  description: 'All the features you need in one place',
                  icon: '⚡'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;