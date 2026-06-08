import Link from 'next/link';

export const metadata = { title: '關於 · 星樞', description: '星樞 — 個人化紫微斗數排盤與解讀' };

export default function AboutPage() {
  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-0)', borderBottom: '1px solid var(--bdr)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--tx-3)', textDecoration: 'none' }}>
          <span style={{ fontSize: '16px' }}>‹</span>
          <span>返回首頁</span>
        </Link>
        <div style={{ width: '1px', height: '20px', background: 'var(--bdr-med)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.2em' }}>星樞</span>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px', color: 'var(--tx-1)', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>關於星樞</h1>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', marginBottom: 32 }}>個人化紫微斗數排盤與解讀</p>

        <p>
          星樞是一個以紫微斗數為核心的個人化命理平台，提供完整的命盤排盤、四化飛星、格局判定，
          以及奠基於《天紀》體系的命盤解讀。我們希望以技術讓更多人接觸並學習這門傳承千年的中華命理智慧。
        </p>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>資料來源</h2>
        <p>
          本平台的排盤引擎、格局知識庫、古籍原文資料及命盤樣本資料集，承自下列上游開源專案：
        </p>
        <ul style={{ paddingLeft: 24 }}>
          <li>
            上游 repo：
            <a href="https://github.com/Renhuai123/ziwei-doushu" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ac)' }}>
              github.com/Renhuai123/ziwei-doushu
            </a>
          </li>
          <li>原作者：王多魚AI</li>
          <li>資料集：紫微斗數開源樣本資料集 v3.0（518,400 條）</li>
          <li>授權：程式碼 MIT、資料自由商用（需保留 attribution）、古籍原文 Public Domain</li>
        </ul>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', marginTop: 16 }}>
          依資料授權條件，本頁保留資料來源標註。如你基於本專案再次衍生，請一併保留。
        </p>
      </main>
    </>
  );
}
