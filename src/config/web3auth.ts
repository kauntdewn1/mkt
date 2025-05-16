import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

export const web3AuthConfig = {
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "",
  chainConfig: {
    chainNamespace: "eip155",
    chainId: "0x1", // Ethereum Mainnet
    rpcTarget: "https://rpc.ankr.com/eth",
  },
  solanaConfig: {
    chainNamespace: "solana",
    chainId: "0x1", // Solana Mainnet
    rpcTarget: "https://api.mainnet-beta.solana.com",
  },
};

export const initWeb3Auth = async () => {
  const web3auth = new Web3Auth({
    clientId: web3AuthConfig.clientId,
    chainConfig: web3AuthConfig.chainConfig,
    web3AuthNetwork: "mainnet",
  });

  const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      uxMode: "popup",
      whiteLabel: {
        name: "FLWFF",
        logoLight: "https://res.cloudinary.com/dgyocpguk/image/upload/v1747194303/logo_horizontal_zxbhl5.png",
        logoDark: "https://res.cloudinary.com/dgyocpguk/image/upload/v1747194303/logo_horizontal_zxbhl5.png",
        defaultLanguage: "pt",
        dark: true,
      },
    },
  });

  // Adiciona o plugin de serviços de carteira
  const walletServicesPlugin = new WalletServicesPlugin();
  web3auth.addPlugin(walletServicesPlugin);

  web3auth.configureAdapter(openloginAdapter);
  await web3auth.initModal();

  return web3auth;
}; 