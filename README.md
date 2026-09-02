# Kosuke & Kokoro Wedding — Supabase RSVP Fix 2

## Changes
- ご欠席の場合は「お名前」「新郎新婦へのメッセージ（任意）」の2項目だけ。
- ご欠席では「ふりがな」「ローマ字」「アレルギー」「その他」は保存しません。
- 確認画面の「修正する」を押した際、フォームが透明になって閉じたように見える不具合を修正。
- Supabase保存処理そのものは変更せず、既存の接続設定を維持。

## IMPORTANT: Existing Supabase project migration
GitHub/Boltを更新する前後どちらでも構いませんが、Supabase Dashboard > SQL Editor で
`supabase/migration_decline_name_message_only.sql` を全文実行してください。

既存テーブルでは furigana / romaji が NOT NULL のため、このMigrationを実行しないと欠席回答を2項目だけでは保存できません。

## Test
1. 出席：名前 / ふりがな / ローマ字 / アレルギーを入力して保存。
2. 欠席：名前だけ（メッセージ空欄）で保存。
3. 欠席：名前 + メッセージで保存。
4. 入力確認画面 → 「修正する」→ 入力フォームが再表示され、入力値が残っていること。

## v4.3 closing update
- Removed the final standalone photograph.
- Added a native Dress Code / Color Palette section at the bottom of the invitation.
- Palette is rendered in CSS (not as an image) and follows the supplied eleven-color reference.
- Closing THANK YOU message remains integrated into the same section.
