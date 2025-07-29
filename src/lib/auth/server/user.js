export const getUser = async () => {
  try {
    const res = await fetch('/api/auth/me', {
      credentials: 'include',
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user || null;
  } catch {
    return null;
  }
};
