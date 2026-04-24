import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { decodeBase64 } from '../utils/decodeBase64';
import '../components/styles/UserPage.css';
import Header from '../components/Header';
import RepoItem from '../components/RepoItem';
import { getRepos, getUserReadMe } from '../utils/GithubApi';
import Preloader from '../components/PreLoader';
import { useLocalStorage } from '../hooks/useLocalStorageHook';
import ReadMe from '../components/ReadMe';

const UserPage = ({ loading, setLoading, user, setCurrentRepo }) => {
  const [readme, setReadMe] = useState('');
  const [readmeCache, setReadmeCache] = useLocalStorage('readme-cache', {});
  const [repos, setRepos] = useState(null);
  const [repoCache, setRepoCache] = useLocalStorage('repo-cache', {});
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    if (!user?.login) return;
    if (repos || readme) return;

    async function fetchReadme() {
      if (readmeCache[user.login] !== undefined) {
        setReadMe(readmeCache[user.login]);
      } else {
        const content = await getUserReadMe(user.login);

        const decoded = content ? decodeBase64(content) : null;

        setReadMe(decoded);

        setReadmeCache((prev) => ({
          ...prev,
          [user.login]: decoded,
        }));
      }
    }

    async function fetchRepos() {
      const content = await getRepos(user.login);
      const normalizedContent = [];

      if (content) {
        content.forEach((repo) => {
          const normalizedRepo = {
            id: repo.id,
            name: repo.name,
            description: repo?.description || 'No description provided',
            language: repo?.language || 'No primary language',
            forks: repo.forks,
            stargazersCount: repo.stargazers_count,
          };

          normalizedContent.push(normalizedRepo);
        });
        setRepos(normalizedContent);
      }
    }

    Promise.all([fetchReadme(), fetchRepos()]);
  }, [user]);

  const slicedRepos = repos?.slice(0, visibleCount);

  return (
    <div className="user_page">
      <Header>
        <img
          className="header__user-avatar"
          src={user.avatarUrl}
          alt={user.login}
        />
        <div className="header__user-info">
          <h2>
            {user.name || user.login} [
            <span className="header__user-login">@{user.login}</span>]
          </h2>
          <p>{user.bio}</p>
          <div className="header__user-stats">
            <span>{user.followers} followers</span>
            <span>{user.following} following</span>
            <span>{user.publicRepos} repos</span>
          </div>
        </div>
      </Header>

      {loading ? (
        <Preloader />
      ) : (
        <div className="user_page__main_content">
          {readme && (
              <ReadMe readme={readme} />
          )}

          {repos && (
            <div className="user_page__repos">
              {slicedRepos.map((repo) => (
                <RepoItem
                  repoCache={repoCache}
                  setRepoCache={setRepoCache}
                  setCurrentRepo={setCurrentRepo}
                  repo={repo}
                  user={user}
                  setLoading={setLoading}
                  key={repo.id}
                />
              ))}
              {visibleCount < repos.length && (
                <button
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                  className="user_page__show_more"
                >
                  Show More
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPage;
