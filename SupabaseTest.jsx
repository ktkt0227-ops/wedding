import React, { useState } from 'react';
import { getSupabaseStatus, submitRsvp } from './supabase';

export default function SupabaseTest() {
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');
  const status = getSupabaseStatus();

  const runTest = async () => {
    setState('sending');
    setMessage('');
    try {
      await submitRsvp({
        attendance: 'ご出席',
        name: 'SUPABASE接続テスト',
        furigana: 'すーぱーべーすせつぞくてすと',
        romaji: 'SUPABASE CONNECTION TEST',
        allergies: 'なし',
        allergyDetails: '',
        other: 'Wedding RSVP test mode',
        message: '',
      });
      setState('success');
      setMessage('送信成功。SupabaseのTable Editorで wedding_rsvp を確認してください。');
    } catch (error) {
      setState('error');
      setMessage(error?.message || '送信に失敗しました。');
    }
  };

  return (
    <main className="supabase-test-page">
      <section className="supabase-test-card">
        <span>WEDDING RSVP / CONNECTION TEST</span>
        <h1>Supabase 接続テスト</h1>
        <p>
          本番RSVPと同じ送信関数を使っています。ここで1件保存できれば、
          本番フォームも同じ経路で保存されます。
        </p>

        <dl>
          <div>
            <dt>Project URL</dt>
            <dd>{status.url || '未設定'}</dd>
          </div>
          <div>
            <dt>Connection</dt>
            <dd>{status.configured ? '設定済み' : '未設定'}</dd>
          </div>
        </dl>

        <button type="button" onClick={runTest} disabled={!status.configured || state === 'sending'}>
          {state === 'sending' ? '送信中…' : 'テスト回答を1件保存する'}
        </button>

        {message && <p className={`supabase-test-result is-${state}`}>{message}</p>}

        <a href="/">招待状へ戻る</a>
      </section>
    </main>
  );
}
