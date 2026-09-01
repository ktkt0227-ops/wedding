# Kosuke & Kokoro Wedding — Supabase RSVP configured

この版は Supabase Project URL / Publishable key を `src/supabase.js` に設定済みです。Bolt側の環境変数設定は不要です。

## 最初に一度だけ必要

Supabase Dashboard > SQL Editor で `supabase/schema.sql` を全文実行してください。これで `public.wedding_rsvp` テーブルと、ゲストが INSERT だけできるRLSポリシーを作成します。

## 接続テスト

Publish後のURL末尾に `?rsvp-test=1` を付けて開き、「テスト回答を1件保存する」を押してください。Supabase Dashboard > Table Editor > wedding_rsvp に `SUPABASE接続テスト` が追加されれば接続成功です。

## 本番

接続テストが成功したら通常URLでRSVPを1件テストしてください。ポップアップは回答保存が安定してから追加します。

## Security

このコードに入っているのはブラウザ公開用途の Publishable key のみです。Secret / service_role key は絶対にフロントへ入れないでください。
