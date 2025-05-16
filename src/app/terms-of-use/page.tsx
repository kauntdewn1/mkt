export default function TermsOfUse() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Termos de Uso</h1>
      <div className="prose prose-invert max-w-none">
        <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        
        <h2>1. Aceitação dos Termos</h2>
        <p>Ao acessar e usar a plataforma FLWFF, você concorda com estes termos de uso.</p>

        <h2>2. Serviços</h2>
        <p>A $FLWFF oferece:</p>
        <ul>
          <li>Stablecoin utilitária</li>
          <li>Plataforma de staking</li>
          <li>Serviços de marketing digital Web3</li>
        </ul>

        <h2>3. Elegibilidade</h2>
        <p>Para usar nossos serviços, você deve:</p>
        <ul>
          <li>Ter pelo menos 18 anos</li>
          <li>Ter capacidade legal para celebrar contratos</li>
          <li>Não estar em lista de sanções ou restrições</li>
        </ul>

        <h2>4. Responsabilidades do Usuário</h2>
        <p>Você é responsável por:</p>
        <ul>
          <li>Manter a segurança de sua conta</li>
          <li>Fornecer informações precisas</li>
          <li>Cumprir leis e regulamentos aplicáveis</li>
          <li>Não usar a plataforma para atividades ilegais</li>
        </ul>

        <h2>5. Limitações de Responsabilidade</h2>
        <p>A FLWFF não é responsável por:</p>
        <ul>
          <li>Perdas devido a flutuações de mercado</li>
          <li>Problemas técnicos fora de nosso controle</li>
          <li>Uso indevido da plataforma por terceiros</li>
        </ul>

        <h2>6. Modificações</h2>
        <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão notificadas.</p>

        <h2>7. Contato</h2>
        <p>Para questões sobre estes termos, entre em contato através de:</p>
        <ul>
          <li>Email: terms@flwff.com</li>
          <li>Discord: discord.gg/flwff</li>
        </ul>
      </div>
    </div>
  );
} 