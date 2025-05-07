import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';
import { useNotification } from '@/context/NotificationContext';

const Dashboard = () => {
    const { user, logout, loading } = useAuth();
    const { addNotification } = useNotification();
    const router = useRouter();
  
    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      } else if (user && router.query.from === 'login') {
        addNotification(`Welcome back, ${user.name}!`, 'success');
        // Remove the query param so it doesn't show again on refresh
        router.replace('/dashboard', undefined, { shallow: true });
      }
    }, [user, loading, router]);
  
    const handleLogout = () => {
      logout();
      addNotification('Logged out successfully!', 'success');
    };
  
    if (loading || !user) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-gray-50">
     
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
            
              <h1 className="text-2xl font-bold text-gray-900">Good {getTimeOfDay()}, {user.name}!</h1>
              <p className="mt-1 text-gray-600">Here's what's happening with your account today.</p>
            </div>
          </div>
        </div>
        
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Dashboard</h2>
          <p className="text-gray-600">You're now logged in and can access all features.</p>
        </div>
      </div>
    </div>
  );
};
// Helper function to get time of day greeting
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';
  return 'Evening';
}

export default Dashboard;