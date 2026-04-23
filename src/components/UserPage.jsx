import Header from './Header';
import './styles/UserPage.css';

const UserPage = ({ loading, setLoading, error, setError, user, setUser }) => {
  return (
    <div className="user_page">
      <Header>
        <img
          className="header__user-avatar"
          src={user.avatar_url}
          alt={user.login}
        />
        <div className="header__user-info">
          <h2>
            {user.name || user.login} [@{user.login}]
          </h2>
          <p>{user.bio}</p>
          <div className="user-header__stats">
            <span>{user.followers} followers</span>
            <span>{user.following} following</span>
            <span>{user.public_repos} repos</span>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default UserPage;
