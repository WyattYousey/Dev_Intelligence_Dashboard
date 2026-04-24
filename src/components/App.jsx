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
  const [error, setError] = useState('');
  const [user, setUser] = useLocalStorage('user', null);
  const [userCache, setUserCache] = useLocalStorage('user', null);
  const [repos, setRepos] = useLocalStorage('repos', []);
  
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
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            user={user}
            setUser={setUser}
          />
        }
      />
      <Route
        path="/repo/:user/:repos"
        element={
          <RepoPage
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            user={user}
            repos={repos}
            setRepos={setRepos}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
