import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUser, login as apiLogin, register as apiRegister, logout as apiLogout } from '../utils/api';
import { AuthContextType, User } from '../types/user';

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUser();
        if (data?.id) {
          setUser(data);
        }
      } catch (error) {
        console.error('Failed to load user', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await apiLogin(email, password);
      const userData = await getUser();
      if (userData?.id) {
        setUser(userData);
        router.push('/dashboard');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await apiRegister(name, email, password);
      const userData = await getUser();
      if (userData?.id) {
        setUser(userData);
        router.push('/dashboard');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);