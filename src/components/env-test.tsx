'use client';

import { useEffect } from 'react';

export const EnvTest = () => {
  useEffect(() => {
    console.log('Variáveis de ambiente:');
    console.log('Google Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    console.log('Web3Auth Client ID:', process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID);
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Teste de Variáveis de Ambiente</h2>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Google Client ID:</span>{' '}
          {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? '✅ Configurado' : '❌ Não configurado'}
        </p>
        <p>
          <span className="font-semibold">Web3Auth Client ID:</span>{' '}
          {process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID ? '✅ Configurado' : '❌ Não configurado'}
        </p>
      </div>
    </div>
  );
}; 