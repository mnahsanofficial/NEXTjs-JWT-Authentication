import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium text-gray-700">User Information</h2>
          <div className="mt-2 bg-gray-50 p-4 rounded-md">
            <p className="text-gray-600"><span className="font-medium">Name:</span> {user.name}</p>
            <p className="text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-700">Account Actions</h2>
          <div className="mt-2 space-x-4">
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              Delete Account
            </button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;