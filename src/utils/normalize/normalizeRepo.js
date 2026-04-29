export function normalizeRepo(repo) {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description || 'No description provided',
    language: repo.language || 'No primary language',
    forks: repo.forks ?? 0,
    stargazersCount: repo.stargazers_count ?? 0,
  };
}
