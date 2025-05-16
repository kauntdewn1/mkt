import HeroSection from 'src/app/FLWFF/hero-section';
import StakingSection from 'src/app/FLWFF/staking-section';
import PriceDisplay from 'src/app/FLWFF/price-display';
import WhitelistForm from 'src/app/FLWFF/whitelist-form';
import DynamicStakingSection from 'src/app/FLWFF/dynamic-staking-section';
import MyStakesList from 'src/app/FLWFF/my-stakes-list';
import StakingForm from 'src/app/FLWFF/staking-form';
import PageFooter from '@/components/layout/page-footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="flex flex-col gap-8">
        {/* Hero Section */}
        <section className="relative w-full min-h-[calc(100vh-4rem)]">
          <HeroSection />
        </section>

        {/* Price Section */}
        <section id="price" className="w-full py-16 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Preço Atual
            </h2>
            <PriceDisplay 
              nftData={{
                contractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "",
                tokenId: process.env.NEXT_PUBLIC_NFT_TOKEN_ID || ""
              }}
            />
          </div>
        </section>

        {/* Whitelist Section */}
        <section id="whitelist" className="w-full py-16 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Lista de Espera
            </h2>
            <WhitelistForm />
          </div>
        </section>

        {/* Staking Section */}
        <section id="staking" className="w-full py-16 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Stake FLWFF
            </h2>
            <StakingSection />
            <div className="mt-12 flex flex-col gap-8">
              <DynamicStakingSection />
              <StakingForm />
              <MyStakesList />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-black border-t border-gray-800 mt-8">
        <PageFooter />
      </footer>
    </div>
  );
} 