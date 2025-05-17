import { EnvTest } from '@/components/env-test';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Teste de Configuração</h1>
      <EnvTest />
    </main>
  );
} 