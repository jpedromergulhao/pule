import React, { createContext, useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { v4 as uuidv4 } from 'uuid';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [storedUser, setStoredUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      console.error("Erro ao ler usuário do localStorage", e);
      return null;
    }
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(setUser(storedUser));
      localStorage.setItem('userRegistered', 'true');
    }
  }, [dispatch]);

  const generateNumericId = () => {
    return parseInt(uuidv4().replace(/\D/g, "").slice(0, 8), 10);
  };

  return (
    <AuthContext.Provider value={{
      showRegister,
      setShowRegister,
      storedUser,
      setStoredUser,
      generateNumericId
    }}>
      {children}
    </AuthContext.Provider>
  );
};
