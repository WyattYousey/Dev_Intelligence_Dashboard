import { Routes } from 'react-router';
import { Route } from 'react-router';

import './styles/App.css';

import HomePage from '../pages/HomePage';
import RepoPage from '../pages/RepoPage';
import UserPage from '../pages/UserPage';
import NotFound from '../pages/NotFound';

import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorageHook';

function App() {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useLocalStorage('user', null);
  const [currentRepo, setCurrentRepo] = useLocalStorage('currentRepo', null);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage />
        }
      />
      <Route
        path="/user/:username"
        element={
          <UserPage
            setCurrentUser={setCurrentUser}
            loading={loading}
            setLoading={setLoading}
          />
        }
      />
      <Route
        path="/repos/:username/:repoName"
        element={
          <RepoPage
            setCurrentRepo={setCurrentRepo}
            setLoading={setLoading}
            loading={loading}
            user={currentUser}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
