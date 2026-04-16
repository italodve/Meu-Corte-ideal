import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Meu Corte Ideal - descubra o corte perfeito para o seu rosto',
  description:
    'Envie uma selfie e descubra, com IA, quais cortes de cabelo combinam com o formato do seu rosto.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
