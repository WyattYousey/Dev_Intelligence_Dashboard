import { formatDate, formatSize } from '../helpers';

export function normalizeRepoDetails(repo, languageData) {
  if (!repo) return null;

  // derived calculations
  const starsScore = Math.min(repo.stargazers_count / 1000, 1) * 40;

  const daysSinceUpdate = Math.floor(
    (Date.now() - new Date(repo.pushed_at)) / (1000 * 60 * 60 * 24)
  );

  const activityScore =
    daysSinceUpdate < 30 ? 30 : daysSinceUpdate < 90 ? 20 : 10;

  const issueRatio =
    repo.open_issues_count / (repo.stargazers_count + 1);

  const issueScore =
    issueRatio < 0.1 ? 20 : issueRatio < 0.3 ? 10 : 5;

  const completenessScore =
    (repo.description ? 5 : 0) +
    (repo.license ? 5 : 0);

  const healthScore = Math.round(
    starsScore + activityScore + issueScore + completenessScore
  );

  // language calculations
  const totalBytes = languageData
    ? Object.values(languageData).reduce((sum, val) => sum + val, 0)
    : 0;

  const primaryLanguage = repo.language || 'Unknown';

  const primaryLanguagePercentage =
    totalBytes && languageData?.[primaryLanguage]
      ? Math.round((languageData[primaryLanguage] / totalBytes) * 100)
      : 0;

  // metadata (UI-ready)
  const metaData = [
    { label: 'Created', value: formatDate(repo.created_at) },
    { label: 'Last Updated', value: formatDate(repo.pushed_at) },
    { label: 'Default Branch', value: repo.default_branch },
    { label: 'License', value: repo.license?.name || 'None' },
    { label: 'Visibility', value: repo.visibility },
    { label: 'Repo Size', value: formatSize(repo.size) },
  ];

  return {
    // original fields you still need
    name: repo.name,
    description: repo.description || 'No description provided',
    forks: repo.forks ?? 0,
    stargazersCount: repo.stargazers_count ?? 0,
    openIssues: repo.open_issues_count ?? 0,

    // derived fields
    healthScore,
    daysSinceUpdate,
    primaryLanguage,
    primaryLanguagePercentage,

    // structured data
    metaData,
    languageData: languageData || {},
  };
}