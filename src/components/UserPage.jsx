import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './styles/UserPage.css';
import Header from './Header';
import { getRepos, getUserReadMe } from '../utils/GithubApi';
import { decodeBase64 } from '../utils/decodeBase64';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import RepoItem from './RepoItem';

const UserPage = ({ loading, setLoading, error, setError, user, setUser }) => {
  const [readme, setReadMe] = useState('');
  const [repos, setRepos] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    async function fetchReadme() {
      const content = await getUserReadMe(user.login);
      if (content) {
        setReadMe(decodeBase64(content));
      }
    }

    async function fetchRepos() {
      const content = await getRepos(user.login);
      if (content) {
        setRepos(content);
      }
    }

    fetchReadme();
    fetchRepos();
  }, [user]);

  const slicedRepos = repos?.slice(0, visibleCount);
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
            {user.name || user.login} [
            <span className="header__user-login">@{user.login}</span>]
          </h2>
          <p>{user.bio}</p>
          <div className="header__user-stats">
            <span>{user.followers} followers</span>
            <span>{user.following} following</span>
            <span>{user.public_repos} repos</span>
          </div>
        </div>
      </Header>

      <div className="user_page__main_content">
        {readme && (
          <div className="user_page__markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {readme}
            </ReactMarkdown>
          </div>
        )}

        {repos && (
          <div className="user_page__repos">
            {slicedRepos.map((repo) => (
              <RepoItem repo={repo} key={repo.id} />
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
    </div>
  );
};

export default UserPage;
