import { useEffect, useState } from 'react';
import { decodeBase64 } from '../utils/decodeBase64';
import '../components/styles/UserPage.css';
import Header from '../components/Header';
import RepoItem from '../components/RepoItem';
import { getRepos, getUserReadMe } from '../utils/GithubApi';
import Preloader from '../components/PreLoader';
import { useLocalStorage } from '../hooks/useLocalStorageHook';
import ReadMe from '../components/ReadMe';
import DashboardLayout from '../components/DashboardLayout';
import DashboardWidget from '../components/DashboardWidget';

const UserPage = ({ setLoading, user, setCurrentRepo }) => {
  const [readme, setReadMe] = useState('');
  const [readmeCache, setReadmeCache] = useLocalStorage('readme-cache', {});
  const [repos, setRepos] = useState([]);
  const [repoCache, setRepoCache] = useLocalStorage('repo-cache', {});
  const [visibleCount, setVisibleCount] = useState(3);

  
  useEffect(() => {
    if (!user?.login) return;
    
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
      setRepos(content);
      }
    
    Promise.all([fetchReadme(), fetchRepos()]);
  }, [user]);

  const slicedRepos = repos?.slice(0, visibleCount);
  
  if (!user) return <Preloader />;
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

      <div className="user_page__content">
        <DashboardLayout type="user">
          {/* LEFT PANEL */}
          <DashboardWidget
            size="medium"
            className="widget--readme"
            title="README"
          >
            {readme && <ReadMe readme={readme} />}
          </DashboardWidget>

          <DashboardWidget
            size="medium"
            className="widget--repos"
            title="Repositories"
          >
            <div className="user_page__repos">
              {slicedRepos.map((repo) => (
                <RepoItem
                  key={repo.id}
                  repo={repo}
                  user={user}
                  repoCache={repoCache}
                  setRepoCache={setRepoCache}
                  setCurrentRepo={setCurrentRepo}
                  setLoading={setLoading}
                />
              ))}

              {visibleCount < repos.length && (
                <button
                  onClick={() => setVisibleCount((p) => p + 3)}
                  className="user_page__show_more"
                >
                  Show More
                </button>
              )}
            </div>
          </DashboardWidget>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default UserPage;
