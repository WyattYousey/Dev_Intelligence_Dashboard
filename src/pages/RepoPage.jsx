import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorageHook';

import Header from '../components/Header';
import DashboardLayout from '../components/DashboardLayout';
import DashboardWidget from '../components/DashboardWidget';
import StatCard from '../components/StatCard';
import HealthScore from '../components/HealthScore';
import MetaGrid from '../components/MetaGrid';
import ReadMe from '../components/ReadMe';
import LanguageChart from '../components/LanguageChart';

import '../components/styles/RepoPage.css';

import { decodeBase64 } from '../utils/decodeBase64';
import { fixGitHubImages } from '../utils/fixReadMeImagePaths';
import { getRepoData } from '../utils/GithubApi';
import Activity from '../components/Activity';
import PrimaryLanguage from '../components/PrimaryLanguage';
import { normalizeRepoDetails } from '../utils/normalize/normalizeRepoDetails';

const RepoPage = ({ user, repo }) => {
  const [languageData, setLanguageData] = useState(null);
  const [readme, setReadMe] = useState(null);
  const [repoReadmeCache, setRepoReadmeCache] = useLocalStorage(
    'repo-readme-cache',
    {}
  );

  console.log(repo);

  const normalizedRepo = normalizeRepoDetails(repo, languageData);

  useEffect(() => {
    if (!repo?.name) return;

    async function fetchReadme() {
      const cached = repoReadmeCache[user.login]?.[repo.name];

      if (cached !== undefined) {
        setReadMe(cached);
      } else {
        const content = await getRepoData(user.login, repo.name, 'readme');
        const decoded = content ? decodeBase64(content.content) : null;
        const fixedReadme = fixGitHubImages(decoded, user.login, repo.name);

        setReadMe(fixedReadme);

        setRepoReadmeCache((prev) => ({
          ...prev,
          [user.login]: {
            ...(prev[user.login] || {}),
            [repo.name]: fixedReadme,
          },
        }));
      }
    }

    async function fetchRepoLanguageData() {
      const content = await getRepoData(user.login, repo.name, 'languages');

      setLanguageData(content);
    }

    Promise.all([fetchReadme(), fetchRepoLanguageData()]);
  }, [repo?.name, user.login]);

  if (!repo) return <Preloader />;
  return (
    <div className="repo_page">
      <Header>
        <img
          className="header__user-avatar"
          src={user.avatarUrl}
          alt={user.login}
        />
        <div className="header__user-info">
          <h1>
            {normalizedRepo.name || normalizedRepo.login} [
            <span className="header__user-login">@{user.login}</span>]
          </h1>
          <p>{normalizedRepo.description}</p>
        </div>
      </Header>

      <div className="repo_page__main_content">
        <DashboardLayout>
          <DashboardWidget size="small" title="Health Score">
            <HealthScore score={normalizedRepo.healthScore} />
          </DashboardWidget>

          <DashboardWidget size="small" title="Key Stats">
            <StatCard label="Stars:" value={normalizedRepo.stargazersCount} />
            <StatCard label="Forks:" value={normalizedRepo.forks} />
            <StatCard label="Open Issues:" value={normalizedRepo.openIssues} />
          </DashboardWidget>

          <DashboardWidget size="small" title="Activity">
            <Activity daysSinceUpdate={normalizedRepo.daysSinceUpdate} />
          </DashboardWidget>

          <DashboardWidget size="small" title="Primary Language">
            <PrimaryLanguage
              primaryLanguage={normalizedRepo.primaryLanguage}
              primaryLanguagePercentage={normalizedRepo.primaryLanguagePercentage}
            />
          </DashboardWidget>

          <DashboardWidget size="medium" title="Languages">
            <LanguageChart languageData={normalizedRepo.languageData} />
          </DashboardWidget>

          <DashboardWidget size="medium" title="Metadata">
            <MetaGrid data={normalizedRepo.metaData} />
          </DashboardWidget>

          <DashboardWidget size="large" title="README">
            <ReadMe readme={readme} />
          </DashboardWidget>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default RepoPage;
