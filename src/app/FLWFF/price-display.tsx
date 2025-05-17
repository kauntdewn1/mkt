'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

interface NFTData {
  tokenId: string;
  contractAddress: string;
  price?: number;
}

interface PriceDisplayProps {
  tokenGeckoId?: string;
  tokenSymbol?: string;
  nftData?: NFTData;
}

async function getNFTPrice(contractAddress: string, tokenId: string): Promise<number | null> {
  try {
    const response = await fetch(`https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${contractAddress}&tokenid=${tokenId}&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`);
    
    if (!response.ok) {
      console.error('Failed to fetch NFT data from Etherscan');
      return null;
    }

    const data = await response.json();
    
    if (data.status === '1' && data.result && data.result.length > 0) {
      const lastSale = data.result.find((tx: any) => tx.value);
      if (lastSale) {
        const priceInEth = parseFloat(lastSale.value) / 1e18;
        return priceInEth;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching NFT price:', error);
    return null;
  }
}

const PriceDisplay: FC<PriceDisplayProps> = ({ nftData }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [displayPrice, setDisplayPrice] = useState('');

  useEffect(() => {
    const fetchPrice = async () => {
      if (!nftData) return;
      
      const newPrice = await getNFTPrice(nftData.contractAddress, nftData.tokenId);
      setPrice(newPrice);
      
      // Se não houver preço, usa o valor padrão
      const priceToDisplay = newPrice ?? 0.01;
      
      setIsTyping(true);
      const priceStr = priceToDisplay.toLocaleString('en-US', { 
        minimumFractionDigits: 8, 
        maximumFractionDigits: 8 
      });
      
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= priceStr.length) {
          setDisplayPrice(priceStr.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 50);
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, [nftData]);

  return (
    <div className="relative p-8 bg-black border-2 border-[#7b0f32] rounded-none font-mono shadow-[0_0_15px_rgba(123,15,50,0.3)]">
      <div className="scanline" />
      <div className="crt-effect" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-[#00ff00]">
            <span className="text-sm">C:\MKS\PRICE.EXE</span>
            <span className="text-xs">|</span>
            <span className="text-sm">Valor Atual:</span>
          </div>
        </div>

        <div className="text-2xl md:text-3xl text-[#00ff00] font-bold mb-2">
          {displayPrice} $MKS
          {isTyping && <span className="animate-blink">_</span>}
        </div>
        <div className="text-xs text-[#00ff00]/70 flex items-center gap-2">
          <span className="animate-pulse-slow">[SISTEMA] Atualizando em tempo real...</span>
          <span className="text-[#00ff00]/50">{'>'}{'>'}{'>'}</span>
        </div>
        <div className="mt-4 text-sm text-[#00ff00]/80">
          <div className="mb-2 bg-green-600 text-white px-4 py-2 rounded">[MENSAGEM DO SISTEMA]</div>
          <div className="italic">
            &ldquo;Transparência em cada bloco. O valor da sua confiança, ancorado na tecnologia.&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceDisplay;