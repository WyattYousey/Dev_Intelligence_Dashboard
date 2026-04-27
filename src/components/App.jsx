import { Routes } from 'react-router';
import { Route } from 'react-router';

import './styles/App.css';

import HomePage from '../pages/HomePage';
import RepoPage from '../pages/RepoPage';
import UserPage from '../pages/UserPage';
import NotFound from '../pages/NotFound';

import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorageHook';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useLocalStorage('user', null);
  const [currentRepo, setCurrentRepo] = useLocalStorage('currentRepo', null);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/:username"
        element={
          <ProtectedRoute>
            <UserPage
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
            <NotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
