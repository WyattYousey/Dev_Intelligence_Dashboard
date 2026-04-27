import { useState } from 'react';
import { useNavigate } from 'react-router';

import { loginUser, register, createFakeJWT } from '../utils/auth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    const user = loginUser(username, password);

    if (!user) {
      setError('Invalid credentials');
      return;
    }

    const token = createFakeJWT(user);
    localStorage.setItem('token', token);

    navigate('/');
  };

  const handleRegister = () => {
    try {
      register(username, password);
      handleLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login_page">
      <h1>Dev Intelligence Dashboard</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Create Account</button>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPage;
