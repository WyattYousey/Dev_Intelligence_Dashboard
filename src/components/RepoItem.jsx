import { useNavigate } from 'react-router';
import { getRepo } from '../utils/GithubApi';
import './styles/RepoItem.css';

const RepoItem = ({
  repo,
  user,
  setLoading,
  setCurrentRepo,
  repoCache,
  setRepoCache,
}) => {
  const navigate = useNavigate();

  const handleRepoSearch = async (username, repoName) => {
    try {
      setLoading(true);

      if (repoCache[username]?.[repoName]) {
        setCurrentRepo(repoCache[username][repoName]);
        navigate(`/repos/${username}/${repoName}`);
        return;
      }

      const res = await getRepo(username, repoName);

      setRepoCache((prev) => ({
        ...prev,
        [username]: {
          ...(prev[username] || {}),
          [repoName]: res,
        },
      }));

      setCurrentRepo(res);
      console.log(res);

      navigate(`/repos/${username}/${repoName}`);
    } catch (err) {
      navigate('/404/repo/not/found');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
