import { useNavigate } from 'react-router';
import { getUser } from '../utils/GithubApi';
import Preloader from '../components/PreLoader';
import SearchBar from '../components/SearchBar';
import '../components/styles/HomePage.css';
import Header from '../components/Header';
import avatarUrlPlaceholder from '../assets/avatar_url_placeholder.svg';

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
        navigate(`/user/${userCache[username].login}`);
        return;
      }

      const res = await getUser(username);

      setUserCache((prev) => ({
        ...prev,
        [username]: {
          avatarUrl: res?.avatar_url || avatarUrlPlaceholder,
          login: res.login,
          name: res?.name || 'No name provided',
          bio: res?.bio || 'No bio on profile',
          followers: res.followers,
          following: res.following,
          publicRepos: res.public_repos,
        },
      }));

      setUser({
        avatarUrl: res?.avatar_url || avatarUrlPlaceholder,
        login: res.login,
        name: res?.name || 'No name provided',
        bio: res?.bio || 'No bio on profile',
        followers: res.followers,
        following: res.following,
        publicRepos: res.public_repos,
      });

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
