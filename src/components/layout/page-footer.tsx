
'use client';

import Link from 'next/link';

export default function PageFooter() {
  return (
    <footer className="py-8 px-4 mt-16 text-center text-muted-foreground text-sm border-t border-border font-serif">
      <div className="max-w-3xl mx-auto">
        <p className="mb-4">
          FLWFF é mais que uma stablecoin. É uma fundação para a nova economia digital — descentralizada, transparente e controlada por código.
        </p>
        <p className="mb-4">
          Todos os dados são verificados on-chain. Sem intermediários. Apenas blockchain, confiança e propósito.
        </p>
        <p className="mb-4">
          Criado por <Link href="https://www.instagram.com/mello.flw/" className="text-accent font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Netto Mello</Link>, estrategista pioneiro em marketing na blockchain, com o poder da <Link href="https://flowoff.xyz/" className="text-accent font-semibold hover:underline" target="_blank" rel="noopener noreferrer">FlowOFF</Link> — agência especializada em experiências digitais na era da descentralização.
        </p>
        <div className="flex justify-center space-x-6 mt-6 text-xs text-muted-foreground/80">
          <Link href="/privacy-policy" className="hover:underline">Política de Privacidade</Link>
          <Link href="/terms-of-use" className="hover:underline">Termos de Uso</Link>
          <Link href="/risk-disclosure" className="hover:underline">Declaração de Riscos</Link>
        </div>
      </div>
    </footer>
  );
}
