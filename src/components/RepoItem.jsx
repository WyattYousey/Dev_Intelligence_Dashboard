import { useNavigate } from 'react-router';
import './styles/RepoItem.css';

const RepoItem = ({
  repo,
  user
}) => {
  const navigate = useNavigate();

  const handleRepoSearch = (username, repoName) => {
    navigate(`/repos/${username}/${repoName}`);
  };
  return (
    <div
      onClick={() => handleRepoSearch(user.login, repo.name)}
      className="repo_item"
    >
      <p className="repo_item__name">{repo.name}</p>
      <p className="repo_item__description">{repo.description}</p>
      <span className="repo_item__data">{repo.language}</span>
      <span className="repo_item__data">{repo.forks} forks</span>
      <span className="repo_item__data">{repo.stargazersCount} stars</span>
    </div>
  );
};

export default RepoItem;
