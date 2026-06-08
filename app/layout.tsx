import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://neo125312-project.github.io/fortune-vault/';

export const metadata: Metadata = {
  title: '星樞 · 個人化紫微斗數排盤與解讀',
  description: '星樞是個人化紫微斗數排盤與解讀平台，提供命盤排盤、四化飛星、格局判定、合盤分析、古籍閱讀器、命理百科。',
  keywords: '星樞, 紫微斗數, 紫微命盤, 命理, 紫微斗數全集, 紫微斗數全書, 骨髓賦, 14主星, 12宮位, 合盤',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '星樞 · 個人化紫微斗數排盤與解讀',
    description: '個人化紫微斗數排盤與解讀，14 主星 × 12 宮位完整命盤分析。',
    url: SITE_URL,
    siteName: '星樞',
    locale: 'zh_TW',
    type: 'website',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('ziwei-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);else document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();` }} />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
