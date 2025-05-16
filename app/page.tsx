import HeroSection from 'src/app/FLWFF/hero-section';
import StakingSection from 'src/app/FLWFF/staking-section';
import PriceDisplay from 'src/app/FLWFF/price-display';
import WhitelistForm from 'src/app/FLWFF/whitelist-form';
import PageFooter from '@/components/layout/page-footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      
      <section id="price" className="w-full py-16 bg-black/50">
        <div className="container mx-auto px-4">
          <PriceDisplay 
            nftData={{
              contractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "",
              tokenId: process.env.NEXT_PUBLIC_NFT_TOKEN_ID || ""
            }}
          />
        </div>
      </section>

      <section id="whitelist" className="w-full py-16 bg-black/50">
        <div className="container mx-auto px-4">
          <WhitelistForm />
        </div>
      </section>

      <section id="staking" className="w-full py-16 bg-black/50">
        <div className="container mx-auto px-4">
          <StakingSection />
        </div>
      </section>
      <PageFooter />
    </main>
  );
} 