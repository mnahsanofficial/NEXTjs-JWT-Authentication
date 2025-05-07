import { AuthProvider } from '../context/AuthContext';
import { NotificationProvider } from '../context/NotificationContext';
import Layout from '../components/Layout';
import { NotificationContainer } from '../components/Notification';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Layout>
          <Component {...pageProps} />
          <NotificationContainer />
        </Layout>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default MyApp;