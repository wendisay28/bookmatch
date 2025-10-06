import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { loginUser, logoutUser, registerUser, RegisterData } from '../services/authService';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  walletAddress?: string;
  readerLevel?: number;
  booksLinked?: number;
  totalExchanges?: number;
  eventsAttended?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  connectWallet: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check if user is logged in on initial load with Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          // Obtener datos adicionales del usuario desde Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userProfile: User = {
              id: firebaseUser.uid,
              name: userData.name || firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              subscriptionStatus: 'active',
              readerLevel: userData.readerLevel || 1,
              booksLinked: userData.booksLinked || 0,
              totalExchanges: userData.totalExchanges || 0,
              eventsAttended: userData.eventsAttended || 0,
              walletAddress: userData.walletAddress
            };
            setUser(userProfile);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to initialize auth', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await loginUser(email, password);
      // El estado del usuario se actualizará automáticamente por onAuthStateChanged
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      await registerUser(data);
      // El estado del usuario se actualizará automáticamente por onAuthStateChanged
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      
      // Check if ethereum object exists on window
      if (!window.ethereum) {
        throw new Error('No se encontró una billetera cripto. Por favor instala MetaMask.');
      }
      
      // Check if the correct network is being used (e.g., Ethereum Mainnet)
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const ethereumChainId = '0x1'; // Ethereum Mainnet
      
      if (chainId !== ethereumChainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ethereumChainId }],
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            throw new Error('Por favor agrega esta red a tu billetera');
          }
          throw switchError;
        }
      }
      
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      if (accounts.length === 0) {
        throw new Error('No se encontraron cuentas. Por favor conecta una billetera.');
      }
      
      const walletAddress = accounts[0];
      
      // Update user with wallet address
      const updatedUser = user ? { ...user, walletAddress } : null;
      setUser(updatedUser);
      
      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return walletAddress;
    } catch (error) {
      console.error('Error al conectar la billetera:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        connectWallet,
        register,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { useAuth };
export default AuthContext;
