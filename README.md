# FLWFF - DAO

Este é o repositório oficial da plataforma FLWFF, uma stablecoin utilitária para o ecossistema de marketing digital baseado em Web3.

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Jest](https://jestjs.io/) - Framework de testes
- [ESLint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Formatador de código
- [Web3Auth](https://web3auth.io/) - Autenticação Web3
- [Firebase](https://firebase.google.com/) - Backend e Autenticação
- [Solana](https://solana.com/) - Blockchain
- [Ethereum](https://ethereum.org/) - Blockchain

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior
- Git
- Conta no Web3Auth (para autenticação)
- Conta no Firebase (para backend)

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/satoshimello/flwff.git
cd flwff
```

2.Instale as dependências:

```bash
npm install
```

3.Configure as variáveis de ambiente:

```bash
cp .env.example .env.local
```

4.Configure as variáveis no `.env.local`:

```env
# Web3Auth
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=seu_client_id_aqui

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

5.Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

## 🔐 Configuração do Web3Auth

1. Acesse <https://dashboard.web3auth.io/>
2. Crie um novo projeto
3. Configure as URLs permitidas (ex: <http://localhost:3000>)
4. Copie o Client ID
5. Adicione no arquivo `.env.local`

## 🔐 Configuração do Firebase

1. Acesse <https://console.firebase.google.com/>
2. Crie um novo projeto
3. Adicione um app web
4. Copie as credenciais
5. Adicione no arquivo `.env.local`

## 🚀 Deploy

### Pré-requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior
- Conta no Firebase
- Firebase CLI instalado: `npm install -g firebase-tools`

### Configuração do Firebase

1. Login no Firebase:

```bash
firebase login
```

2.Inicialize o projeto:

```bash
firebase init
```

3.Selecione as opções:

- Hosting
- Firestore
- Storage
- Emulators (opcional)

4.Configure as variáveis de ambiente:

```bash

cp .env.example .env.local
```

5.Edite o `.env.local` com suas credenciais do Firebase:

```env

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

### Deploy

1.Build do projeto:

```bash

npm run build
```

2.Deploy para o Firebase:

```bash

firebase deploy
```

O site estará disponível em: <https://flwff-platform.web.app>

### Regras de Segurança

- Firestore: `firestore.rules`
- Storage: `storage.rules`

As regras estão configuradas para:

- Negar acesso por padrão
- Permitir leitura pública para conteúdo público
- Restringir escrita apenas para usuários autenticados
- Proteger dados de usuários

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run test` - Executa os testes
- `npm run typecheck` - Verifica tipos TypeScript

## 📁 Estrutura do Projeto

```

flwff/
├── src/
│   ├── app/           # Páginas Next.js 13+
│   ├── components/    # Componentes React
│   ├── contexts/      # Contextos React
│   ├── utils/         # Funções utilitárias
│   └── types/         # Definições de tipos
├── public/            # Arquivos estáticos
└── ...

```

## 🧪 Testes

O projeto usa Jest para testes. Para executar os testes:

```bash
npm run test
```

## 📝 Convenções de Código

- Usamos ESLint e Prettier para manter a consistência do código
- Seguimos o guia de estilo do Next.js
- Commits seguem o padrão Conventional Commits

## 🔒 Segurança

- Todas as dependências são verificadas regularmente
- Implementamos headers de segurança
- Usamos CSP (Content Security Policy)
- Autenticação segura com Web3Auth e Firebase

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

Para suporte, entre em contato através do Discord: discord.gg/flwff
