import React, { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextProps {
  token: string;
  user: User | null;
  loginAction: (data: LoginData) => Promise<void>;
  logOut: () => void;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  // Function to validate the token
  const validateToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:3000/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await response.json();
      return response.ok && res.valid;
    } catch (err) {
      console.error("Error validating token:", err);
      return false;
    }
  };

  // Function to fetch user details
  const fetchUserDetails = async (token: string): Promise<User | null> => {
    try {
      const response = await fetch("http://localhost:3000/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        return res.user;
      }
      return null;
    } catch (err) {
      console.error("Error fetching user details:", err);
      return null;
    }
  };

  // Effect to validate token on app load or token change
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        const isValid = await validateToken(token);
        if (!isValid) {
          logOut(); // Log out if the token is invalid
        } else {
          const userData = await fetchUserDetails(token);
          setUser(userData);
        }
      }
    };

    initializeAuth();
  }, [token]);

  const loginAction = async (data: LoginData): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/dashboard");
        return;
      }

      throw new Error(res.message);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const logOut = (): void => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
