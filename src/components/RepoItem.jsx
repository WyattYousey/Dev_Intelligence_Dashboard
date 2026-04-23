import './styles/RepoItem.css';

const RepoItem = ({ repo }) => {
  return (
    <div className="repo_item">
      <h4 className="repo_item__name">{repo.name}</h4>
      <p className="repo_item__description">{repo.description}</p>
      <span className="repo_item__data">{repo.language}</span>
      <span className="repo_item__data">{repo.forks} forks</span>
      <span className="repo_item__data">{repo.stargazers_count} stars</span>
    </div>
  );
};

export default RepoItem;
