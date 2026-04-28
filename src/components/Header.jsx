import logo from '/favicon.svg';
import './styles/Header.css';
import { useNavigate } from 'react-router';

const Header = ({ screenWidth, children }) => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <a href="/" className="header__branding">
        <img className="header__logo" src={logo} alt="logo" />
        {screenWidth < 741 ? (
          <h1 className="header__title">D.I.D</h1>
        ) : (
          <h1 className="header__title">Dev Intelligence Dashboard</h1>
        )}
      </a>
      {children && <div className="header__content">{children}</div>}
      <button onClick={handleSignout} className="header__signout">
        Signout
      </button>
    </header>
  );
};

export default Header;
