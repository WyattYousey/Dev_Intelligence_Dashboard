import { useNavigate } from 'react-router';
import './styles/RepoItem.css';

const RepoItem = ({ repo, user }) => {
  const navigate = useNavigate();

  const handleRepoSearch = (username, repoName) => {
    navigate(`/repos/${username}/${repoName}`);
  };
  return (
    <article
      onClick={() => handleRepoSearch(user.login, repo.name)}
      className="repo_item"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleRepoSearch(user.login, repo.name);
        }
      }}
    >
      <h3 className="repo_item__name">{repo.name}</h3>
      <p className="repo_item__description">{repo.description}</p>
      <div className="repo_item__metadata">
        {repo.language && (
          <span className="repo_item__data">Language: {repo.language}</span>
        )}
        <span className="repo_item__data">{repo.forks} forks</span>
        <span className="repo_item__data">{repo.stargazersCount} stars</span>
      </div>
    </article>
  );
};

export default RepoItem;
