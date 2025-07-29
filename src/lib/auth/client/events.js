export const AUTH_EVENTS = {
  LOGIN: 'auth:login',
  LOGOUT: 'auth:logout',
  UPDATE: 'auth:update',
};

export const dispatchAuthEvent = (eventType, data = null) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(eventType, { detail: data }));
  }
}; 