import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import '../components/styles/UserPage.css';

import Header from '../components/Header';
import RepoItem from '../components/RepoItem';
import Preloader from '../components/PreLoader';
import ReadMe from '../components/ReadMe';
import DashboardLayout from '../components/DashboardLayout';
import DashboardWidget from '../components/DashboardWidget';
import ErrorBanner from '../components/ErrorBanner';

import { getRepos, getUser, getUserReadMe } from '../utils/GithubApi';
import { useLocalStorage } from '../hooks/useLocalStorageHook';
import { runWithLoader } from '../utils/helpers';
import { decodeBase64 } from '../utils/decodeBase64';

const UserPage = ({ screenWidth, setCurrentUser, loading, setLoading }) => {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [readme, setReadMe] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);
  const [error, setError] = useState("User Undefined");

  const [userCache, setUserCache] = useLocalStorage('user-cache', {});
  const [readmeCache, setReadmeCache] = useLocalStorage('readme-cache', {});

  const cachedUser = userCache[username];
  const cachedReadme = readmeCache[username];
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) return;

    async function loadUserPage() {
      try {
        setError(null);

        let userData = cachedUser;

        if (!userData) {
          userData = await runWithLoader(() => getUser(username), setLoading);

          if (!userData) {
            navigate('/404');
            return;
          }

          setUserCache((prev) => ({
            ...prev,
            [username]: userData,
          }));
        }

        setUser(userData);
        setCurrentUser?.(userData);

        const repoData = await runWithLoader(
          () => getRepos(username),
          setLoading
        );

        if (!repoData) {
          setError('Failed to load repositories');
        } else {
          setRepos(repoData);
        }

        if (cachedReadme !== undefined) {
          setReadMe(cachedReadme);
        } else {
          const content = await runWithLoader(
            () => getUserReadMe(username),
            setLoading
          );

          const decoded = content ? decodeBase64(content) : null;

          if (!decoded) {
            setError('ReadMe not found');
            return;
          }

          setReadMe(decoded);

          setReadmeCache((prev) => ({
            ...prev,
            [username]: decoded,
          }));
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong while loading user data');
      }
    }

    loadUserPage();
  }, [
    username,
    cachedUser,
    cachedReadme,
    setCurrentUser,
    setLoading,
    setReadmeCache,
    setUserCache,
  ]);

  const slicedRepos = repos.slice(0, visibleCount);

  return (
    <div className="user_page">
      {error && <ErrorBanner message={error} onClose={() => setError(null)} />}

      {loading || !user ? (
        <Preloader />
      ) : (
        <>
          <Header screenWidth={screenWidth}>
            {screenWidth < 1024 ? (
              <></>
            ) : (
              <>
                <img
                  className="header__user-avatar"
                  src={user.avatar_url || user.avatarUrl}
                  alt={user.login}
                />

                <div className="header__user-info">
                  <h2>
                    {user.name || user.login}
                    <span className="header__user-login">@{user.login}</span>
                  </h2>

                  <p>{user.bio}</p>

                  <div className="header__user-stats">
                    <span>{user.followers} followers</span>
                    <span>{user.following} following</span>
                    <span>{user.publicRepos} repos</span>
                  </div>
                </div>
              </>
            )}
          </Header>

          <div className="user_page__content">
            {screenWidth > 1024 ? (
              <></>
            ) : (
              <div className="user_page__user_content">
                <img
                  className="header__user-avatar"
                  src={user.avatar_url || user.avatarUrl}
                  alt={user.login}
                />

                <div className="header__user-info">
                  <h2>
                    {user.name || user.login}
                    <span className="header__user-login">@{user.login}</span>
                  </h2>

                  <p>{user.bio}</p>

                  <div className="header__user-stats">
                    <span>{user.followers} followers</span>
                    <span>{user.following} following</span>
                    <span>{user.publicRepos} repos</span>
                  </div>
                </div>
              </div>
            )}
            <DashboardLayout
              type="user"
              mobileWithReadme={screenWidth <= 1024 && readme}
            >
              {screenWidth <= 1024 && readme ? (
                <DashboardWidget
                  type="user"
                  size="medium"
                  title="README"
                  className="widget--readme"
                >
                  <ReadMe readme={readme} />
                </DashboardWidget>
              ) : screenWidth > 1024 ? (
                <DashboardWidget
                  type="user"
                  size="medium"
                  title="README"
                  className="widget--readme"
                >
                  {readme ? (
                    <ReadMe readme={readme} />
                  ) : (
                    <p>No Profile ReadMe Provided</p>
                  )}
                </DashboardWidget>
              ) : null}

              {screenWidth < 1024 ? (
                readme ? (
                  <DashboardWidget
                    type="user"
                    size="medium"
                    title="Repositories"
                    className="widget--repos"
                  >
                    <div className="user_page__repos">
                      {slicedRepos.map((repo) => (
                        <RepoItem key={repo.id} repo={repo} user={user} />
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
                ) : (
                  <DashboardWidget
                    type="mobile"
                    size="large"
                    title="Repositories"
                    className="widget--repos"
                  >
                    <div className="user_page__repos">
                      {slicedRepos.map((repo) => (
                        <RepoItem key={repo.id} repo={repo} user={user} />
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
                )
              ) : (
                <DashboardWidget
                  type="user"
                  size="medium"
                  title="Repositories"
                  className="widget--repos"
                >
                  <div className="user_page__repos">
                    {slicedRepos.map((repo) => (
                      <RepoItem key={repo.id} repo={repo} user={user} />
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
              )}
            </DashboardLayout>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
