import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Bet Simulator - Teste de Integração',
  description: 'Simulador de Bet para testar integração com Game Provider',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
