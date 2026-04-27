export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatSize = (size) => {
  return `${(size / 1024).toFixed(2)} MB`;
};

function withMinDelay(promise, minDelay = 1200) {
  const delay = new Promise((res) => setTimeout(res, minDelay));
  return Promise.all([promise, delay]).then(([result]) => result);
}

export async function runWithLoader(fn, setLoading, minDelay = 600) {
  setLoading(true);

  try {
    const result = await withMinDelay(fn(), minDelay);
    return result;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    setLoading(false);
  }
}
