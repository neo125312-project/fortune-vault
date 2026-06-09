import { Suspense } from 'react';
import SearchClient from './search-client';

export const metadata = {
  title: '搜尋 · 古籍原典庫',
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: 80, textAlign: 'center', color: 'var(--tx-3)' }}>載入中…</div>}>
      <SearchClient />
    </Suspense>
  );
}
