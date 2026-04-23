import logo from '/favicon.svg';
import './styles/Header.css';

const Header = ({ children }) => {
  return (
    <header className="header">
      <div className="header__branding">
        <img className="header__logo" src={logo} alt="logo" />
        <h1 className="header__title">Dev Intelligence Dashboard</h1>
      </div>

      {children && <div className="header__content">{children}</div>}
    </header>
  );
};

export default Header;
