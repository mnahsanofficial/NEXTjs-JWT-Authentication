import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState([
    { name: 'Projects', value: 18, icon: '📁', change: '+3', trend: 'up' },
    { name: 'Tasks', value: 42, icon: '✅', change: '+8', trend: 'up' },
    { name: 'Team', value: 5, icon: '👥', change: '+1', trend: 'up' },
    { name: 'Revenue', value: '$12,450', icon: '💰', change: '12%', trend: 'up' }
  ]);
  
  const [recentProjects] = useState([
    { id: 1, name: 'Website Redesign', progress: 80, status: 'active', team: 4 },
    { id: 2, name: 'Mobile App', progress: 45, status: 'active', team: 3 },
    { id: 3, name: 'Marketing Campaign', progress: 100, status: 'completed', team: 5 }
  ]);

  const [notifications] = useState([
    { id: 1, message: 'New project assigned to you', time: '2h ago', read: false },
    { id: 2, message: 'Task deadline approaching', time: '5h ago', read: true },
    { id: 3, message: 'Team meeting at 3 PM', time: '1d ago', read: true }
  ]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Mobile sidebar toggle would go here */}
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-md md:min-h-screen p-4">
          <div className="flex items-center space-x-3 p-4 mb-8">
            {/* <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div> */}
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {[
              { name: 'Dashboard', icon: '📊', href: '#', current: activeTab === 'dashboard' },
              { name: 'Projects', icon: '📁', href: '#', current: activeTab === 'projects' },
              { name: 'Tasks', icon: '✅', href: '#', current: activeTab === 'tasks' },
              { name: 'Team', icon: '👥', href: '#', current: activeTab === 'team' },
              { name: 'Calendar', icon: '📅', href: '#', current: activeTab === 'calendar' },
              { name: 'Settings', icon: '⚙️', href: '#', current: activeTab === 'settings' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.name.toLowerCase());
                }}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  item.current
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {/* Welcome header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Good {getTimeOfDay()}, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your projects today.
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-50 text-blue-600 text-xl mr-4">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <div className="flex items-baseline mt-1">
                      <p className="text-2xl font-semibold">{stat.value}</p>
                      <span className={`ml-2 text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Projects and activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Projects */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800">Recent Projects</h2>
                <button 
                  onClick={() => router.push('/projects/new')}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  New Project
                </button>
              </div>
              
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            project.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {project.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {project.team} {project.team > 1 ? 'members' : 'member'}
                          </span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            project.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                          }`} 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Notifications</h2>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg border ${
                      notification.read 
                        ? 'border-gray-200 bg-white' 
                        : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <p className="font-medium">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                View All Notifications
              </button>
            </div>
          </div>
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