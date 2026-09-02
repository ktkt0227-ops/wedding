const DEFAULT_SUPABASE_URL = 'https://lbgfrowpsophcmbqzcmh.supabase.co';
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_WVN9fKZhoZBY28FszXRO9A_goNB0FE1';

const SUPABASE_URL = String(
  import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL,
).replace(/\/$/, '');

const SUPABASE_KEY = String(
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  DEFAULT_SUPABASE_PUBLISHABLE_KEY,
);

export function getSupabaseStatus() {
  return {
    configured: Boolean(SUPABASE_URL && SUPABASE_KEY),
    url: SUPABASE_URL,
  };
}

export async function submitRsvp(payload) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabaseの接続設定がありません。');
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/wedding_rsvp`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        attendance: payload.attendance,
        name: payload.name,
        furigana: payload.attendance === 'ご出席' ? payload.furigana || null : null,
        romaji: payload.attendance === 'ご出席' ? payload.romaji || null : null,
        allergies: payload.attendance === 'ご出席' ? payload.allergies || null : null,
        allergy_details:
          payload.attendance === 'ご出席' && payload.allergies === 'あり'
            ? payload.allergyDetails || null
            : null,
        other: payload.attendance === 'ご出席' ? payload.other || null : null,
        message: payload.attendance === 'ご欠席' ? payload.message || null : null,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      let detail = '';
      try {
        const data = await response.json();
        detail = data?.message || data?.details || data?.hint || '';
      } catch {
        detail = await response.text().catch(() => '');
      }
      throw new Error(detail || `送信に失敗しました (${response.status})`);
    }

    return true;
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error('送信がタイムアウトしました。通信環境をご確認ください。');
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
