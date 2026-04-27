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
  const [user, setUser] = useLocalStorage('user', null);
  const [userCache, setUserCache] = useLocalStorage('user-cache', {});
  const [currentRepo, setCurrentRepo] = useLocalStorage('currentRepo',null);
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            loading={loading}
            setLoading={setLoading}
            setUser={setUser}
            userCache={userCache}
            setUserCache={setUserCache}
          />
        }
      />
      <Route
        path="/user/:username"
        element={
          <UserPage
            setLoading={setLoading}
            user={user}
            setCurrentRepo={setCurrentRepo}
          />
        }
      />
      <Route
        path="/repos/:user/:repo"
        element={
          <RepoPage
            user={user}
            repo={currentRepo}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
