import { Routes } from 'react-router';
import { Route } from 'react-router';

import './styles/App.css';

import HomePage from '../pages/HomePage';
import RepoPage from '../pages/RepoPage';
import UserPage from '../pages/UserPage';
import NotFound from '../pages/NotFound';

import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorageHook';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useLocalStorage('user', null);
  const [, setCurrentRepo] = useLocalStorage('currentRepo', null); // TODO: currentRepo is stored but currently unused
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage screenWidth={screenWidth} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/:username"
        element={
          <ProtectedRoute>
            <UserPage
              screenWidth={screenWidth}
              setCurrentUser={setCurrentUser}
              loading={loading}
              setLoading={setLoading}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/repos/:username/:repoName"
        element={
          <ProtectedRoute>
            <RepoPage
              screenWidth={screenWidth}
              setCurrentRepo={setCurrentRepo}
              setLoading={setLoading}
              loading={loading}
              user={currentUser}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <NotFound screenWidth={screenWidth} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
