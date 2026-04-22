import { Routes } from 'react-router';
import { Route } from 'react-router';
import './styles/App.css';
import HomePage from './HomePage';
import RepoPage from './RepoPage';
import UserPage from './UserPage';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
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
    </Routes>
  );
}

export default App;
