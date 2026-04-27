import { normalizeRepos } from "./normalize/normalizeRepos";
import { normalizeUser } from "./normalize/normalizeUser";

const baseUrl = 'https://api.github.com';

export async function getUser(username) {
  try {
    const result = await fetch(`${baseUrl}/users/${username}`);

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const data = await result.json();
    const normalizedData = normalizeUser(data);
    return normalizedData;
  } catch (error) {
    console.error('Fetch operation failed:', error.message);
    return null;
  }
}

export async function getUserReadMe(username) {
  try {
    const result = await fetch(
      `${baseUrl}/repos/${username}/${username}/readme`
    );

    if (result.status === 404) {
      console.log(`[INFO] No ReadMe found for ${username}`);
      return null;
    }

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const data = await result.json();
    return data.content;
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
    const normalizedData = normalizeRepos(data);
    return normalizedData;
  } catch (error) {
    console.error('Fetch operation failed:', error.message);
    return null;
  }
}

export async function getRepo(username, repo) {
  try {
    const result = await fetch(`${baseUrl}/repos/${username}/${repo}`);

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

export async function getRepoData(username, repo, endpoint) {
  try {
    const result = await fetch(
      `${baseUrl}/repos/${username}/${repo}/${endpoint}`
    );

     if (result.status === 404) {
       console.log(`[INFO] No ${endpoint} found for ${repo}`);
       return null;
     }

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
