export const useAuth = () => {
  const login = (token : string) => {
    localStorage.setItem('token', token);
    window.dispatchEvent(new Event('storage'));
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
  };

  return {
    login,
    logout,
  };
};