import logo from '/favicon.svg';
import './styles/Header.css';
import { useNavigate } from 'react-router';

const Header = ({ children }) => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header__branding">
        <img className="header__logo" src={logo} alt="logo" />
        <h1 className="header__title">Dev Intelligence Dashboard</h1>
      </div>
      {children && <div className="header__content">{children}</div>}
      <button onClick={handleSignout} className="header__signout">
        Signout
      </button>
    </header>
  );
};

export default Header;
