import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Painel do Agente - Game Provider',
  description: 'Gerencie sua integração com o provedor de jogos',
  icons: {
    icon: '/game-provider-simbol.png',
    shortcut: '/game-provider-simbol.png',
    apple: '/game-provider-simbol.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="agent-panel-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
