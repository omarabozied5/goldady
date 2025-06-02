// Generate a random 64-character hexadecimal string
const generateSessionToken = (): string => {
  return Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
};

// Get session token from localStorage or generate new one
export const getSessionToken = (): string => {
  const existingToken = localStorage.getItem("session_token");

  if (existingToken && existingToken.length === 64) {
    return existingToken;
  }

  const newToken = generateSessionToken();
  localStorage.setItem("session_token", newToken);
  return newToken;
};
