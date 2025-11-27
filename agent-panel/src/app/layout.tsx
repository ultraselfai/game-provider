import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Painel do Agente - Game Provider',
  description: 'Gerencie sua integração com o provedor de jogos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
