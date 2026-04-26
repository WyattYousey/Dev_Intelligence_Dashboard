import { useEffect, useRef, useState } from 'react';
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

const RepoPage = ({ loading, setLoading, user, repo }) => {
  const [languageData, setLanguageData] = useState(null);
  const [readme, setReadMe] = useState(null);
  const [repoReadmeCache, setRepoReadmeCache] = useLocalStorage(
    'repo-readme-cache',
    {}
  );

  console.log(repo);

  const starsScore = Math.min(repo.stargazers_count / 1000, 1) * 40;
  const daysSinceUpdate =
    (Date.now() - new Date(repo.pushed_at)) / (1000 * 60 * 60 * 24);
  const activityScore =
    daysSinceUpdate < 30 ? 30 : daysSinceUpdate < 90 ? 20 : 10;
  const issueRatio = repo.open_issues_count / (repo.stargazers_count + 1);
  const issueScore = issueRatio < 0.1 ? 20 : issueRatio < 0.3 ? 10 : 5;
  const completenessScore = (repo.description ? 5 : 0) + (repo.license ? 5 : 0);
  const totalScore = Math.round(
    starsScore + activityScore + issueScore + completenessScore
  );

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
            {repo.name || repo.login} [
            <span className="header__user-login">@{user.login}</span>]
          </h1>
          <p>{repo.description}</p>
          <div className="header__user-stats">
            <span>{repo.forks} forks</span>
            <span>{repo.stargazers_count} stars</span>
            <span>{repo.open_issues} open issues</span>
            {repo.language && <span>{repo.language}</span>}
          </div>
        </div>
      </Header>

      {loading ? (
        <Preloader />
      ) : (
        <div className="repo_page__main_content">
          <DashboardLayout>
            <DashboardWidget size="small" title="Health Score">
              <HealthScore score={totalScore} />
            </DashboardWidget>

            <DashboardWidget size="small" title="Key Stats">
              <StatCard label="Stars:" value={repo.stargazers_count} />
              <StatCard label="Forks:" value={repo.forks} />
              <StatCard label="Open Issues:" value={repo.open_issues} />
              <StatCard label="Visibility:" value={repo.visibility} />
            </DashboardWidget>

            <DashboardWidget size="small" title="Activity">
              <p>{daysSinceUpdate < 30 ? '🟢 Active' : '⚪ Stale'}</p>
              <span>{Math.floor(daysSinceUpdate)} days ago</span>
            </DashboardWidget>

            <DashboardWidget size="small" title="Primary Language" />

            <DashboardWidget size="medium" title="Languages">
              <LanguageChart languageData={languageData} />
            </DashboardWidget>

            <DashboardWidget size="medium" title="Metadata">
              {/* <MetaGrid data={metaData} /> */}
            </DashboardWidget>

            <DashboardWidget size="large" title="README">
              <ReadMe readme={readme} />
            </DashboardWidget>
          </DashboardLayout>
        </div>
      )}
    </div>
  );
};

export default RepoPage;
