import { getUser } from '../utils/GithubApi';
import Preloader from './PreLoader';
import SearchBar from './SearchBar';
import './styles/HomePage.css';
import logo from '/favicon.svg';

const HomePage = ({ loading, setLoading, setUser }) => {
  const handleUserSearch = (username) => {
    setLoading(true);

    getUser(username)
      .then((res) => {
        setUser(res);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };
  return (
    <div className="home_page">
      <header className="header">
        <img className="header__logo" src={logo} alt="Code symbol for logo" />
        <h1 className="header__title">Dev Intelligence Dashboard</h1>
      </header>

      {loading ? (
        <Preloader />
      ) : (
        <div className="home_page__main_content">
          <SearchBar
            placeholder="Search GitHub user..."
            onSubmit={handleUserSearch}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
