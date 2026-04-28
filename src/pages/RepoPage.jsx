import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorageHook';
import { useParams } from 'react-router';

import Header from '../components/Header';
import DashboardLayout from '../components/DashboardLayout';
import DashboardWidget from '../components/DashboardWidget';
import StatCard from '../components/StatCard';
import HealthScore from '../components/HealthScore';
import MetaGrid from '../components/MetaGrid';
import ReadMe from '../components/ReadMe';
import LanguageChart from '../components/LanguageChart';
import Activity from '../components/Activity';
import Preloader from '../components/PreLoader';
import PrimaryLanguage from '../components/PrimaryLanguage';

import '../components/styles/RepoPage.css';

import { runWithLoader } from '../utils/helpers';
import { decodeBase64 } from '../utils/decodeBase64';
import { fixGitHubImages } from '../utils/fixReadMeImagePaths';
import { getRepo, getRepoData } from '../utils/GithubApi';
import { normalizeRepoDetails } from '../utils/normalize/normalizeRepoDetails';

const RepoPage = ({
  screenWidth,
  loading,
  setLoading,
  user,
}) => {
  const { username, repoName } = useParams();

  const [repo, setRepo] = useState(null);
  const [languageData, setLanguageData] = useState(null);
  const [readme, setReadMe] = useState(null);

  const [repoCache, setRepoCache] = useLocalStorage('repo-cache', {});
  const [repoReadmeCache, setRepoReadmeCache] = useLocalStorage(
    'repo-readme-cache',
    {}
  );

  const normalizedRepo = repo ? normalizeRepoDetails(repo, languageData) : null;

  useEffect(() => {
    if (!username || !repoName) return;

    const loadRepo = async () => {
      const cached = repoCache?.[username]?.[repoName];

      if (cached) {
        setRepo(cached);
        return;
      }

      const repoData = await runWithLoader(
        () => getRepo(username, repoName),
        setLoading
      );

      setRepoCache((prev) => ({
        ...prev,
        [username]: {
          ...(prev[username] || {}),
          [repoName]: repoData,
        },
      }));

      setRepo(repoData);
    };

    loadRepo();
  }, [username, repoName, repoCache, setLoading]);

  useEffect(() => {
    if (!repo?.name || !user?.login) return;

    const fetchExtras = async () => {
      const cached = repoReadmeCache[user.login]?.[repo.name];

      let finalReadme = cached;

      if (cached === undefined) {
        const content = await getRepoData(user.login, repo.name, 'readme');
        const decoded = content ? decodeBase64(content.content) : null;

        finalReadme = decoded
          ? fixGitHubImages(decoded, user.login, repo.name)
          : null;

        setRepoReadmeCache((prev) => ({
          ...prev,
          [user.login]: {
            ...(prev[user.login] || {}),
            [repo.name]: finalReadme,
          },
        }));
      }

      setReadMe(finalReadme);

      const lang = await getRepoData(user.login, repo.name, 'languages');
      setLanguageData(lang);
    };

    fetchExtras();
  }, [repo?.name, repoReadmeCache, user]);

  if (loading || !repo || !normalizedRepo || !user) {
    return (
      <div className="repo_page">
        <Preloader />
      </div>
    );
  }
  
  return (
    <div className="repo_page">
      <Header screenWidth={screenWidth}>
        {screenWidth < 1324 ? (
          <></>
        ) : (
          <>
            <img
              className="header__user-avatar"
              src={user.avatarUrl}
              alt={user.login}
            />
            <div className="header__user-info">
              <h1>
                {normalizedRepo.name}
                <span className="header__user-login">@{user.login}</span>
              </h1>
              <p>{normalizedRepo.description}</p>
            </div>
          </>
        )}
      </Header>

      <div className="repo_page__main_content">
        {screenWidth > 1324 ? (
          <></>
        ) : (
          <div className="repo_page__repo_content">
            <img
              className="header__user-avatar"
              src={user.avatarUrl}
              alt={user.login}
            />
            <div className="header__user-info">
              <h1>
                {normalizedRepo.name}{' '}
                <span className="header__user-login">@{user.login}</span>
              </h1>
              <p>{normalizedRepo.description}</p>
            </div>
          </div>
        )}

        <DashboardLayout>
          <DashboardWidget type="repo" size="small" title="Health Score">
            <HealthScore score={normalizedRepo.healthScore} />
          </DashboardWidget>

          <DashboardWidget type="repo" size="small" title="Key Stats">
            <StatCard label="Stars:" value={normalizedRepo.stargazersCount} />
            <StatCard label="Forks:" value={normalizedRepo.forks} />
            <StatCard label="Issues:" value={normalizedRepo.openIssues} />
          </DashboardWidget>

          <DashboardWidget type="repo" size="small" title="Activity">
            <Activity daysSinceUpdate={normalizedRepo.daysSinceUpdate} />
          </DashboardWidget>

          <DashboardWidget type="repo" size="small" title="Primary Language">
            <PrimaryLanguage
              primaryLanguage={normalizedRepo.primaryLanguage}
              primaryLanguagePercentage={
                normalizedRepo.primaryLanguagePercentage
              }
            />
          </DashboardWidget>

          {screenWidth < 640 ? (
            <></>
          ) : (
            <DashboardWidget type="repo" size="medium" title="Languages">
              <LanguageChart languageData={normalizedRepo.languageData} />
            </DashboardWidget>
          )}

          <DashboardWidget type="repo" size="medium" title="Metadata">
            <MetaGrid data={normalizedRepo.metaData} />
          </DashboardWidget>

          <DashboardWidget type="repo" size="large" title="README">
            <ReadMe readme={readme} />
          </DashboardWidget>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default RepoPage;
