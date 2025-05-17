'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES, type SafeEventEmitterProvider } from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { ethers } from 'ethers';
import { initializeFirebase } from '@/lib/firebase';
import type { User as FirebaseUser, Auth as FirebaseAuthInstanceType } from 'firebase/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-hot-toast';

// Adicionar tipagem para window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Define the user type for our context
export interface AppUser {
  id: string;
  email?: string | null;
  walletAddress?: string | null;
  authMethod: 'firebase_email' | 'web3auth_wallet';
  provider?: SafeEventEmitterProvider | null;
  firebaseUser?: FirebaseUser | null;
  isWhitelisted: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  web3auth: Web3Auth | null;
  firebaseReady: boolean;
  loginWithWeb3: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<FirebaseUser | null>;
  signupWithEmail: (email: string, pass: string) => Promise<FirebaseUser | null>;
  loginWithGoogle: () => Promise<FirebaseUser | null>;
  logout: () => Promise<void>;
  signIn: (user: { id: string; email: string; name: string; avatar: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Verificar variáveis de ambiente
const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;
if (!clientId) {
  console.error('[AuthContext] ERRO CRÍTICO: NEXT_PUBLIC_WEB3AUTH_CLIENT_ID não está definido no .env');
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [web3authInstance, setWeb3authInstance] = useState<Web3Auth | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseAuthInstance, setFirebaseAuthInstance] = useState<FirebaseAuthInstanceType | null>(null);
  const [firebaseReady, setFirebaseReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper function to set Web3 user
  const setWeb3User = useCallback(async (provider: SafeEventEmitterProvider) => {
    try {
      console.log('[AuthContext] Iniciando setWeb3User...');
      
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();
      
      const userInfo = await web3authInstance?.getUserInfo();
      console.log('[AuthContext] Informações do usuário:', userInfo);

      setUser({
        id: address,
        walletAddress: address,
        email: userInfo?.email || null,
        authMethod: 'web3auth_wallet',
        provider: provider,
        isWhitelisted: false
      });
      
      console.log('[AuthContext] Usuário Web3 configurado com sucesso:', address);
    } catch (error) {
      console.error('[AuthContext] Erro ao configurar usuário Web3:', error);
      toast.error('Erro ao conectar carteira');
    }
  }, [web3authInstance]);

  // Inicializar Firebase
  useEffect(() => {
    const initFirebase = async () => {
      try {
        const { auth: authInstance } = initializeFirebase();
        setFirebaseAuthInstance(authInstance);
        setFirebaseReady(true);
        console.log('[AuthContext] Firebase inicializado com sucesso');
      } catch (error) {
        console.error('[AuthContext] Erro ao inicializar Firebase:', error);
        setFirebaseReady(false);
      }
    };

    initFirebase();
  }, []);

  // Inicializar Web3Auth
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID) {
          throw new Error('NEXT_PUBLIC_WEB3AUTH_CLIENT_ID não está definido');
        }

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            uxMode: 'popup',
            whiteLabel: {
              appName: "FLWFF Project",
              logoLight: "https://res.cloudinary.com/dgyocpguk/image/upload/v1747181760/2_zucoyt.png",
              logoDark: "https://res.cloudinary.com/dgyocpguk/image/upload/v1747181760/2_zucoyt.png",
              mode: "dark"
            },
            loginConfig: {
              google: {
                name: "Google",
                verifier: "google",
                typeOfLogin: "google",
                clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
              },
            },
          },
        });

        const web3auth = new Web3Auth({
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth",
            displayName: "Ethereum Mainnet",
            blockExplorerUrl: "https://etherscan.io",
            ticker: "ETH",
            tickerName: "Ethereum",
          },
          web3AuthNetwork: "mainnet",
          enableLogging: true,
          privateKeyProvider: openloginAdapter as any,
        });

        await web3auth.initModal();

        web3auth.on("connected", (data) => {
          console.log("[AuthContext] Connected:", data);
        });

        web3auth.on("connecting", () => {
          console.log("[AuthContext] Connecting...");
        });

        web3auth.on("disconnected", () => {
          console.log("[AuthContext] Disconnected");
          setWeb3authInstance(null);
        });

        web3auth.on("errored", (error) => {
          console.error("[AuthContext] Error:", error);
        });

        setWeb3authInstance(web3auth);
        console.log("[AuthContext] SUCCESS: Web3Auth modal initialized.");
      } catch (error) {
        console.error("[AuthContext] ERROR: Failed to initialize Web3Auth:", error);
        setError(error instanceof Error ? error : new Error('Falha ao inicializar Web3Auth'));
      } finally {
        setIsLoading(false);
      }
    };

    if (mounted) {
      initAuth();
    }
  }, [mounted]);

  useEffect(() => {
    console.log('[AuthContext] INFO: AuthProvider useEffect for Web3Auth and Firebase listener triggered. Firebase Auth Instance available:', !!firebaseAuthInstance, 'Firebase Ready:', firebaseReady);
    
    let unsubscribeFirebase: (() => void) | null = null;
    if (firebaseAuthInstance) {
      console.log('[AuthContext] INFO: Setting up Firebase Auth state listener.');
      unsubscribeFirebase = onAuthStateChanged(firebaseAuthInstance, (fbUser) => {
        console.log('[AuthContext] EVENT: Firebase Auth state changed. Firebase User UID:', fbUser ? fbUser.uid : 'null');
        if (fbUser) {
          if (!user || user.authMethod !== 'web3auth_wallet') {
            console.log('[AuthContext] INFO: Firebase user detected, and no active Web3Auth session. Setting user from Firebase. UID:', fbUser.uid);
            setUser({
              id: fbUser.uid,
              email: fbUser.email,
              authMethod: 'firebase_email',
              firebaseUser: fbUser,
              isWhitelisted: false
            });
          } else {
            console.log('[AuthContext] INFO: Firebase user detected, but Web3Auth user session is active. Prioritizing Web3Auth user. Wallet:', user.walletAddress);
          }
        } else if (user?.authMethod !== 'web3auth_wallet') {
          console.log('[AuthContext] INFO: No Firebase user and not a Web3Auth wallet session. Setting user to null.');
          setUser(null);
        }
        console.log('[AuthContext] INFO: Finished processing Firebase Auth state change. Setting loading to false.');
        setLoading(false);
      }, (error) => {
        console.error('[AuthContext] ERROR: Firebase Auth state listener error:', error);
        setLoading(false);
      });
    } else {
      console.warn("[AuthContext] WARN: Firebase Auth instance not ready when trying to set up listener. Email/password auth and persisted sessions might be affected.");
      if (loading && !web3authInstance?.provider) {
        console.log('[AuthContext] INFO: Firebase Auth not ready, Web3Auth provider not active. Setting loading to false.');
        setLoading(false);
      }
    }

    return () => {
      if (unsubscribeFirebase) {
        console.log('[AuthContext] INFO: Unsubscribing Firebase Auth state listener.');
        unsubscribeFirebase();
      }
    };
  }, [firebaseAuthInstance, firebaseReady, loading, user, web3authInstance?.provider]);

  const loginWithWeb3 = async () => {
    if (!web3authInstance) {
      console.error('[AuthContext] CRITICAL: Web3Auth not initialized. Cannot login with Web3.');
      return;
    }
    console.log('[AuthContext] INFO: Attempting Web3 login...');
    try {
      setLoading(true);
      const web3authProvider = await web3authInstance.connect();
      if (web3authProvider) {
        console.log('[AuthContext] SUCCESS: Web3Auth connected, provider obtained.');
        await setWeb3User(web3authProvider);
        if (firebaseAuthInstance?.currentUser) {
          console.log('[AuthContext] INFO: Firebase user detected during Web3 login, signing out from Firebase to prioritize Web3 session.');
          await firebaseSignOut(firebaseAuthInstance);
        }
      } else {
        console.warn('[AuthContext] WARN: Web3Auth connect did not return a provider.');
      }
    } catch (error) {
      console.error('[AuthContext] ERROR: Web3Auth login error:', error);
      setUser(null);
    } finally {
      console.log('[AuthContext] INFO: Web3 login attempt finished. Setting loading to false.');
      setLoading(false);
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    if (!firebaseAuthInstance) {
      console.error("[AuthContext] CRITICAL: Firebase Auth not ready for email login.");
      throw new Error("Serviço de autenticação indisponível. Tente novamente mais tarde.");
    }
    console.log('[AuthContext] INFO: Attempting Firebase email login for:', email);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuthInstance, email, pass);
      console.log('[AuthContext] SUCCESS: Firebase email login successful for UID:', userCredential.user.uid);
      if (web3authInstance?.provider) {
        console.log('[AuthContext] INFO: Web3Auth provider active during email login, logging out from Web3Auth to prioritize Firebase session.');
        await web3authInstance.logout();
      }
      setLoading(false);
      return userCredential.user;
    } catch (error: any) {
      console.error("[AuthContext] ERROR: Firebase email login error:", error, "Code:", error.code, "Message:", error.message);
      setLoading(false);
      throw error;
    }
  };

  const signupWithEmail = async (email: string, pass: string) => {
    if (!firebaseAuthInstance) {
      console.error("[AuthContext] CRITICAL: Firebase Auth not ready for email signup.");
      throw new Error("Serviço de cadastro indisponível. Tente novamente mais tarde.");
    }
    console.log('[AuthContext] INFO: Attempting Firebase email signup for:', email);
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuthInstance, email, pass);
      console.log('[AuthContext] SUCCESS: Firebase email signup successful for UID:', userCredential.user.uid);
      if (web3authInstance?.provider) {
        console.log('[AuthContext] INFO: Web3Auth provider active during email signup, logging out from Web3Auth to prioritize Firebase session.');
        await web3authInstance.logout();
      }
      setLoading(false);
      return userCredential.user;
    } catch (error: any) {
      console.error("[AuthContext] ERROR: Firebase email signup error:", error, "Code:", error.code, "Message:", error.message);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      if (user?.authMethod === 'web3auth_wallet' && web3authInstance?.status === "connected") {
        await web3authInstance.logout();
      }
      
      if ((user?.authMethod === 'firebase_email' || firebaseAuthInstance?.currentUser) && firebaseAuthInstance) {
        await firebaseSignOut(firebaseAuthInstance);
      }
      
      setUser(null);
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      console.error('[AuthContext] Erro ao fazer logout:', error);
      toast.error('Erro ao realizar logout');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    if (!firebaseAuthInstance) {
      console.error("[AuthContext] CRITICAL: Firebase Auth not ready for Google login.");
      throw new Error("Serviço de autenticação indisponível. Tente novamente mais tarde.");
    }
    console.log('[AuthContext] INFO: Attempting Google login');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(firebaseAuthInstance, provider);
      console.log('[AuthContext] SUCCESS: Google login successful for UID:', userCredential.user.uid);
      if (web3authInstance?.provider) {
        console.log('[AuthContext] INFO: Web3Auth provider active during Google login, logging out from Web3Auth to prioritize Firebase session.');
        await web3authInstance.logout();
      }
      setLoading(false);
      return userCredential.user;
    } catch (error: any) {
      console.error("[AuthContext] ERROR: Google login error:", error, "Code:", error.code, "Message:", error.message);
      setLoading(false);
      throw error;
    }
  };

  const signIn = async (user: { id: string; email: string; name: string; avatar: string }) => {
    setUser({
      id: user.id,
      email: user.email,
      authMethod: 'web3auth_wallet',
      walletAddress: user.id,
      isWhitelisted: false,
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        web3auth: web3authInstance,
        firebaseReady,
        loginWithWeb3,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        logout,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider. This is a critical application setup error.');
  }
  return context;
};

