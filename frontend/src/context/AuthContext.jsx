
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => sessionStorage.getItem("shopease-token")
  );
  const [loading, setLoading] = useState(true);

  // Restore the logged-in user's session
  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser(token);
        setUser(data.user);
      } catch (error) {
        sessionStorage.removeItem("shopease-token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [token]);

  // Register a new customer
  const register = async (userData) => {
    return await registerUser(userData);
  };

  // Log in a customer
  const login = async (credentials) => {
    const data = await loginUser(credentials);

    sessionStorage.setItem("shopease-token", data.token);
    setToken(data.token);
    setUser(data.user);

    return data;
  };

  // Log out the customer
  const logout = () => {
    sessionStorage.removeItem("shopease-token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(user && token),
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing authentication
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
