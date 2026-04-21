import { Routes } from 'react-router';
import { Route } from 'react-router';
import './styles/App.css';
import HomePage from './HomePage';
import RepoPage from './RepoPage';
import UserPage from './UserPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/:username" element={<UserPage />} />
      <Route path="/repo/:owner/:repo" element={<RepoPage />} />
    </Routes>
  );
}

export default App;
