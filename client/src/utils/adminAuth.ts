const ADMIN_SESSION_KEY = 'admin_session';
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

export const setAdminSession = (): void => {
  const expiryTime = Date.now() + SESSION_DURATION;
  sessionStorage.setItem(ADMIN_SESSION_KEY, expiryTime.toString());
};

export const isAdminSessionValid = (): boolean => {
  const expiryTime = sessionStorage.getItem(ADMIN_SESSION_KEY);
  if (!expiryTime) return false;
  
  const isValid = Date.now() < parseInt(expiryTime);
  if (!isValid) {
    clearAdminSession();
  }
  return isValid;
};

export const clearAdminSession = (): void => {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
};

export const refreshAdminSession = (): void => {
  if (isAdminSessionValid()) {
    setAdminSession();
  }
};
