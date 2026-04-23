export const validateUserSearch = (trimmedSearch, setError) => {
  if (!trimmedSearch) {
    setError('Please enter a valid username');
    return false;
  }

  if (trimmedSearch.length > 39) {
    setError('Username is too long');
    return false;
  }

  if (!/^[a-zA-Z0-9-]+$/.test(trimmedSearch)) {
    setError('Only letters, numbers, and hyphens allowed');
    return false;
  }

  setError('');
  return true;
};
