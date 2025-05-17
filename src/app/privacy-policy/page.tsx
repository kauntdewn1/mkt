export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Política de Privacidade</h1>
      <div className="prose prose-invert max-w-none">
        <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        
        <h2>1. Informações que Coletamos</h2>
        <p>Coletamos informações que você nos fornece diretamente, incluindo:</p>
        <ul>
          <li>Informações de conta (endereço de carteira, email)</li>
          <li>Informações de transação</li>
          <li>Dados de uso da plataforma</li>
        </ul>

        <h2>2. Como Usamos Suas Informações</h2>
        <p>Utilizamos suas informações para:</p>
        <ul>
          <li>Fornecer e manter nossos serviços</li>
          <li>Processar transações</li>
          <li>Melhorar nossa plataforma</li>
          <li>Cumprir obrigações legais</li>
        </ul>

        <h2>3. Compartilhamento de Dados</h2>
        <p>Não compartilhamos suas informações pessoais com terceiros, exceto quando:</p>
        <ul>
          <li>Exigido por lei</li>
          <li>Necessário para proteger nossos direitos</li>
          <li>Com seu consentimento explícito</li>
        </ul>

        <h2>4. Segurança</h2>
        <p>Implementamos medidas de segurança para proteger suas informações, incluindo:</p>
        <ul>
          <li>Criptografia de dados</li>
          <li>Controles de acesso</li>
          <li>Monitoramento de segurança</li>
        </ul>

        <h2>5. Seus Direitos</h2>
        <p>Você tem o direito de:</p>
        <ul>
          <li>Acessar suas informações</li>
          <li>Corrigir dados imprecisos</li>
          <li>Solicitar a exclusão de dados</li>
          <li>Retirar seu consentimento</li>
        </ul>

        <h2>6. Contato</h2>
        <p>Para questões sobre esta política, entre em contato através de:</p>
        <ul>
          <li>Email: markcash.eth@ethermail.io</li>
          <li>Telegram: @markcash</li>
        </ul>
      </div>
    </div>
  );
} 