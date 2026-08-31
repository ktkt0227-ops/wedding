# Kosuke & Kokoro Wedding Invitation — V4

Final polish version based on V3.

## V4 changes
- Added required `ローマ字表記` field to RSVP (attending and declining guests)
- Added Google Form config placeholder `romaji`
- Replaced all displayed photos with the three new Cloudinary images
- Added soft photographic fades/blur transitions between photo and content sections
- Added a final full-screen wedding photo before the footer
- Preserved the V3 Invitation Film opening and existing RSVP logic

## Google Form configuration
Before the live launch, set the missing `entry.xxxxx` values in `src/config.js`, including:
- furigana
- romaji
- allergies
- allergyDetails
- other

Existing old-form mappings are retained for attendance, name, and message.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```


## Google Form final mapping (2026-08-31)

- attendance: entry.1565553525
- name: entry.2008521144
- furigana: entry.913915265
- romaji: entry.1584005778
- allergies: entry.1453486906
- allergyDetails: entry.1210402089
- other: entry.1621438563
- message (欠席者用): entry.64086897

Google Form側では旧「メッセージ」質問 (entry.1282079580) を削除し、
新しい「新郎新婦へのメッセージ」(entry.64086897) を残してください。


## Final update — RSVP success modal
After a successful Google Forms POST, an editorial confirmation modal is shown immediately.
- Attending: 「当日お会いできますことを 心より楽しみにしております」
- Declining: 「またお会いできる機会を 楽しみにしております」
- The existing persistent THANK YOU state remains visible after closing the modal.


## FINAL FIX 2
- Google Forms submission now uses a real JSX `<form method="POST" target="google-form-submit-frame">` rather than `fetch()` or dynamic `form.submit()`.
- The iframe is permanently rendered and its `load` event completes the UI after Google responds.
- A 1.8s fallback guarantees the success modal does not get stuck even if the cross-origin iframe load event is suppressed.
- Only the verified current entry IDs are posted. The old legacy message entry has been removed.
- Google Form config must keep only Name / Attendance / Furigana / Romaji required. Allergy/detail/other/message must be optional on Google Forms because the website conditionally omits them.


## RSVP submission
This build sends RSVP responses to the deployed Google Apps Script Web App via a native POST form targeting a hidden iframe. The Apps Script creates and submits the Google FormResponse. Direct POSTs to Google Forms /formResponse are no longer used. Popup success modal is intentionally disabled in this answer-first build.
