export const config = {
  app: {
    name: 'FLWFF',
    description: 'FLWFF Project - Staking Platform',
  },
  web3: {
    chainId: '0x1',
    rpcUrl: 'https://rpc.ankr.com/eth',
  },
  firebase: {
    // Configurações do Firebase serão carregadas do .env
  },
  web3auth: {
    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
    network: 'mainnet',
  },
} as const; 