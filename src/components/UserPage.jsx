import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './styles/UserPage.css';
import Header from './Header';
import { getUserReadMe } from '../utils/GithubApi';
import { decodeBase64 } from '../utils/decodeBase64';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const UserPage = ({ loading, setLoading, error, setError, user, setUser }) => {
  const [readme, setReadMe] = useState('');

  useEffect(() => {
    async function fetchReadme() {
      const content = await getUserReadMe(user.login);
      if (content) {
        setReadMe(decodeBase64(content));
      }
    }

    fetchReadme();
  }, [user]);
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
      </div>
    </div>
  );
};

export default UserPage;
