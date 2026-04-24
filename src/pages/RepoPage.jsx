import Header from '../components/Header';

const RepoPage = ({ loading, setLoading, user, repo }) => {
  return (
    <div className="repo_page">
      <Header>
        <img
          className="header__user-avatar"
          src={user.avatarUrl}
          alt={user.login}
        />
        <div className="header__user-info">
          <h2>
            {repo.name || repo.login} [
            <span className="header__user-login">@{user.login}</span>]
          </h2>
          <p>{repo.description}</p>
          <div className="header__user-stats">
            <span>{repo.forks} forks</span>
            <span>{repo.stargazers_count} stars</span>
            <span>{repo.open_issues} open issues</span>
            {(repo.language) && (
              <span>{repo.language}</span>
            )}
          </div>
        </div>
      </Header>
    </div>
  );
};

export default RepoPage;
