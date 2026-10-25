import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoParentUser } from '../data/demoData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('littleaura_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return demoParentUser;
      }
    }
    return demoParentUser;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('littleaura_auth_status') !== 'false');
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('littleaura_user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email, password) => {
    // Quick validation / simulation
    const updatedUser = {
      ...demoParentUser,
      email: email || demoParentUser.email,
    };
    setUser(updatedUser);
    setIsAuthenticated(true);
    localStorage.setItem('littleaura_auth_status', 'true');
    return updatedUser;
  };

  const loginWithGoogle = async () => {
    const googleUser = {
      ...demoParentUser,
      name: 'Gokul',
      email: 'gokul.aura@gmail.com',
    };
    setUser(googleUser);
    setIsAuthenticated(true);
    localStorage.setItem('littleaura_auth_status', 'true');
    return googleUser;
  };

  const signup = async ({ name, email, password }) => {
    const newUser = {
      ...demoParentUser,
      id: `usr_${Date.now()}`,
      name: name || 'Parent',
      email: email || 'parent@littleaura.app',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('littleaura_auth_status', 'true');
    return newUser;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('littleaura_auth_status', 'false');
  };

  const updateUserProfile = (fields) => {
    setUser(prev => ({
      ...prev,
      ...fields
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginWithGoogle,
        signup,
        logout,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
