import { getUser } from '../utils/GithubApi';
import SearchBar from './SearchBar';
import './styles/HomePage.css';
import logo from '/favicon.svg';

const HomePage = ({ loading, setLoading, error, setError, user, setUser }) => {
  const handleUserSearch = (username) => {
    getUser(username)
      .then((res) => {
        setUser(res);
      })
      .catch(console.error);
  };

  return (
    <div className="home_page">
      <header className="header">
        <img className="header__logo" src={logo} alt="Code symbol for logo" />
        <h1 className="header__title">Dev Intelligence Dashboard</h1>
      </header>

      <div className="home_page__main_content">
        <SearchBar
          placeholder="Search GitHub user..."
          onSubmit={(username) => {
            console.log('Searching for:', username);
            handleUserSearch(username);
            console.log(user);
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
