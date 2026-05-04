export function decodeBase64(content) {
  try {
    return decodeURIComponent(escape(atob(content)));
  } catch {
    return atob(content);
  }
}
