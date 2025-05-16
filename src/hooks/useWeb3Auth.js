// src/hooks/useWeb3Auth.js
import { useState, useEffect } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { ethers } from "ethers";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const useWeb3Auth = () => {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [user, setUser] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const init = async () => {
      const web3authInstance = new Web3Auth({
        clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x1", // Ethereum Mainnet
          rpcTarget: "https://rpc.ankr.com/eth", // ou qualquer RPC
        },
      });

      await web3authInstance.initModal();
      setWeb3auth(web3authInstance);

      if (web3authInstance.provider) {
        setProvider(web3authInstance.provider);
        const ethersProvider = new ethers.providers.Web3Provider(web3authInstance.provider);
        const signer = ethersProvider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setUser(await web3authInstance.getUserInfo());
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) return;
    const web3Provider = await web3auth.connect();
    setProvider(web3Provider);

    const ethersProvider = new ethers.providers.Web3Provider(web3Provider);
    const signer = ethersProvider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);
    setUser(await web3auth.getUserInfo());

    // 🔥 Aqui tu faz tua lógica de segurança e autenticação
    const customToken = await getCustomTokenFromYourServer(address);
    await signInWithCustomToken(auth, customToken);
  };

  const logout = async () => {
    if (!web3auth) return;
    await web3auth.logout();
    setProvider(null);
    setUser(null);
    setWalletAddress(null);
  };

  return { login, logout, user, walletAddress, provider };
};

// 🔐 Simula uma requisição ao teu backend (ou função Firebase) que retorna um token válido
async function getCustomTokenFromYourServer(walletAddress) {
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress }),
  });

  const data = await res.json();
  return data.token;
}
