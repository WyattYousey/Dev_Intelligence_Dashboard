export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatSize = (size) => {
  return `${(size / 1024).toFixed(2)} MB`;
};

export async function runWithLoader(fn, setLoading, minDelay = 400) {
  setLoading(true);

  const start = Date.now();

  try {
    const result = await fn();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    const elapsed = Date.now() - start;
    const remaining = minDelay - elapsed;

    if (remaining > 0) {
      await new Promise((res) => setTimeout(res, remaining));
    }

    setLoading(false);
  }
}