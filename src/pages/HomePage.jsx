import { useNavigate } from 'react-router';
import { getUser } from '../utils/GithubApi';
import Preloader from '../components/PreLoader';
import SearchBar from '../components/SearchBar';
import '../components/styles/HomePage.css';
import Header from '../components/Header';
import { normalizeUser } from '../utils/normalize/normalizeUser';

const HomePage = ({
  loading,
  setLoading,
  setUser,
  userCache,
  setUserCache,
}) => {
  const navigate = useNavigate();

  const handleUserSearch = async (username) => {
    try {
      setLoading(true);

      if (userCache[username]) {
        setUser(userCache[username]);
        navigate(`/user/${username}`);
        return;
      }

      const res = await getUser(username);

      if (!res) {
        throw new Error(404, { message: 'User not found' });
      }
      
      const normalizedUser = normalizeUser(res);

      setUserCache((prev) => ({
        ...prev,
        [username]: normalizedUser,
      }));

      setUser(normalizedUser);

      navigate(`/user/${res.login}`);
    } catch (err) {
      navigate('/404/user/not/found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home_page">
      <Header />

      {loading ? (
        <Preloader />
      ) : (
        <div className="home_page__main_content">
          <SearchBar
            placeholder="Search for any GitHub user..."
            onSubmit={handleUserSearch}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
