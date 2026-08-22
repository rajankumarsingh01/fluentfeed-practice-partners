const USER_ID_KEY = "fluentfeed_user_id";

export const getUserId = (): string | null => {
  return localStorage.getItem(USER_ID_KEY);
};

export const setUserId = (id: string): void => {
  localStorage.setItem(USER_ID_KEY, id);
};

export const clearUserId = (): void => {
  localStorage.removeItem(USER_ID_KEY);
};

export const hasProfile = (): boolean => {
  return !!getUserId();
};