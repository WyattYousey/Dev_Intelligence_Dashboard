export const fixGitHubImages = (markdown, user, repo) => {
  if (!markdown || typeof markdown !== 'string') {
    return null;
  }

  const base = `https://raw.githubusercontent.com/${user}/${repo}/main`;

  return markdown.replace(
    /!\[(.*?)\]\((?!http)(.*?)\)/g,
    (match, alt, path) => {
      const cleanPath = path.replace(/^\.\//, '');
      return `![${alt}](${base}/${cleanPath})`;
    }
  );
};
