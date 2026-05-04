import avatarUrlPlaceholder from '../../assets/avatar_url_placeholder.svg';

export function normalizeUser(res) {
  if (!res) return null;

  return {
    avatarUrl: res.avatar_url || avatarUrlPlaceholder,
    login: res.login,
    name: res.name || 'No name provided',
    bio: res.bio || 'No bio on profile',
    followers: res.followers ?? 0,
    following: res.following ?? 0,
    publicRepos: res.public_repos ?? 0,
  };
}
