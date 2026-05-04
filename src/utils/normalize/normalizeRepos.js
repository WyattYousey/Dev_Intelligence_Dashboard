import { normalizeRepo } from './normalizeRepo';

export function normalizeRepos(repos) {
  if (!Array.isArray(repos)) return [];

  return repos.map(normalizeRepo);
}
