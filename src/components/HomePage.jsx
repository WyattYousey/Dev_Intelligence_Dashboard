import './styles/HomePage.css';
import logo from '/favicon.svg';

const HomePage = () => {
  return (
    <div className='home_page'>
          <header className="header">
              <img src={logo} alt="Code symbol for logo" />
              <h1>Dev Intelligence Dashboard</h1>
      </header>

      <div className="searchbar__wrapper">
        <input className="searchbar" type="text" />
        <button className="searchbar__submit_btn" type="submit">Search</button>
      </div>
    </div>
  );
};

export default HomePage;
