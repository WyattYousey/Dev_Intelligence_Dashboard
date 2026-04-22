const baseUrl = 'https://api.github.com';

export async function getUser(username) {
  try {
    const result = await fetch(`${baseUrl}/users/${username}`);

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Fetch operation failed:', error.message);
    return null;
  }
}

export async function getRepos(username) {
  try {
    const result = await fetch(`${baseUrl}/users/${username}/repos`);

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Fetch operation failed:', error.message);
    return null;
  }
}
