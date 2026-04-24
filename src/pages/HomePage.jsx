import { useNavigate } from 'react-router';
import { getUser } from '../utils/GithubApi';
import Preloader from '../components/PreLoader';
import SearchBar from '../components/SearchBar';
import '../components/styles/HomePage.css';
import Header from '../components/Header';

const HomePage = ({ loading, setLoading, setUser }) => {
  const navigate = useNavigate();

  const handleUserSearch = async (username) => {
    try {
      setLoading(true);

      const res = await getUser(username);
      if (res.ok) {
        setUser({
          avatar_url: res.avatar_url,
          login: res.login,
          name: res.name,
          bio: res.bio,
          followers: res.followers,
          following: res.following,
          public_repos: res.public_repos,
        });

        navigate(`/user/${res.login}`);
      }
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
