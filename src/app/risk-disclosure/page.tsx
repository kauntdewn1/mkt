export default function RiskDisclosure() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Declaração de Riscos</h1>
      <div className="prose prose-invert max-w-none">
        <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        
        <h2>1. Riscos Gerais</h2>
        <p>Investir em criptomoedas envolve riscos significativos, incluindo:</p>
        <ul>
          <li>Volatilidade de preços</li>
          <li>Riscos regulatórios</li>
          <li>Riscos tecnológicos</li>
          <li>Riscos de mercado</li>
        </ul>

        <h2>2. Riscos Específicos do FLWFF</h2>
        <p>Riscos específicos associados ao token FLWFF:</p>
        <ul>
          <li>Riscos de liquidez</li>
          <li>Riscos de smart contract</li>
          <li>Riscos de staking</li>
          <li>Riscos de governança</li>
        </ul>

        <h2>3. Riscos Técnicos</h2>
        <p>Riscos relacionados à tecnologia:</p>
        <ul>
          <li>Vulnerabilidades de segurança</li>
          <li>Falhas de rede</li>
          <li>Problemas de compatibilidade</li>
          <li>Riscos de integração</li>
        </ul>

        <h2>4. Riscos Regulatórios</h2>
        <p>Considerações regulatórias importantes:</p>
        <ul>
          <li>Mudanças na legislação</li>
          <li>Requisitos de conformidade</li>
          <li>Restrições jurisdicionais</li>
          <li>Implicações fiscais</li>
        </ul>

        <h2>5. Aviso de Isenção</h2>
        <p>Esta declaração não constitui aconselhamento financeiro. Considere cuidadosamente seus objetivos de investimento e riscos antes de participar.</p>

        <h2>6. Contato</h2>
        <p>Para questões sobre riscos, entre em contato através de:</p>
        <ul>
          <li>Email: markcash.eth@ethermail.io</li>
          <li>Telegram: @markcash</li>
        </ul>
      </div>
    </div>
  );
} 