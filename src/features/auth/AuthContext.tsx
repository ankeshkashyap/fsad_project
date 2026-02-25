import React, { createContext, useEffect, useMemo, useState } from "react";
import { AuthUser, UserRole } from "../../types/user";
import { loadFromStorage, saveToStorage } from "../../utils/storage";
import { mockUsers } from "../../services/mockData";

const STORAGE_KEY = "sustainable-auth-user";

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, role: UserRole, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const createToken = (email: string) => `mock-token-${btoa(email)}-${Date.now().toString(36)}`;

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() =>
    loadFromStorage<AuthUser | null>(STORAGE_KEY, null)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEY, user);
  }, [user]);

  const login = async (email: string, _password: string) => {
    // In a real app you would verify the password server-side. Here we only match by email.
    const allUsers = [...mockUsers];
    const found = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      throw new Error("No account found with that email address.");
    }

    setUser({
      ...found,
      token: createToken(found.email)
    });
  };

  const register = async (name: string, email: string, role: UserRole, _password: string) => {
    const existing = user && user.email.toLowerCase() === email.toLowerCase();
    if (existing) {
      throw new Error("An account with this email already exists in this browser.");
    }

    const newUser: AuthUser = {
      id: `local-${Date.now().toString(36)}`,
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
      token: createToken(email)
    };

    // In a real backend this user would be persisted in a database.
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

