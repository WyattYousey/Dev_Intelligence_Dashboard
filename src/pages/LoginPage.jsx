import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
  loginUser,
  register,
  createFakeJWT,
  isTokenValid,
} from '../utils/auth';

import '../components/styles/LoginPage.css';
import Header from '../components/Header';

const LoginPage = ({ screenWidth }) => {
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      navigate('/');
    }
  }, []);
  return (
    <div className="login_page">
      <Header screenWidth={screenWidth} />

      <div className="login_page__content">
        <form className="login_page__form">
          Register or Login
          <input
            className="login_page__input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="login_page__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>

        <div className="login_page__buttons">
          <button className="login_page__button" onClick={handleLogin}>
            Login
          </button>
          <button className="login_page__button" onClick={handleRegister}>
            Create Account
          </button>
        </div>

        {error && <p className="login_page__error">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
