import { useNavigate } from 'react-router';
import SearchBar from '../components/SearchBar';
import '../components/styles/HomePage.css';
import Header from '../components/Header';

const HomePage = () => {
  const navigate = useNavigate();

  const handleUserSearch = async (username) => {
    navigate(`/user/${username}`);
  };

  return (
    <div className="home_page">
      <Header />
        <div className="home_page__main_content">
          <SearchBar
            placeholder="Search for any GitHub user..."
            onSubmit={handleUserSearch}
          />
        </div>
    </div>
  );
};

export default HomePage;
