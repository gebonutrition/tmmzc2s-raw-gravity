# TMMZC2S — Raw Gravity × Take My Muffin

Copied from the compact TMMZC1S landing. This project keeps the existing mobile/desktop layout, gallery, offer/coupon blocks, ticker, limited-edition banner, and Klaviyo newsletter form.

## Amazon Attribution

All Amazon CTAs use this attribution URL by default:

`https://www.amazon.com/dp/B0GTWJ3K1R?maas=maas_adg_799ABB226F6E59DBE055DECE8147C7A5_afap_abs&ref_=aa_maas&tag=maas`

## URL-parameter pixels (Pixel & Lead Wiring Spec)

- TikTok Pixel loads only when the landing URL includes `?pixel=YOUR_TIKTOK_PIXEL_ID`.
- Meta Pixel loads only when the landing URL includes `?fbpixel=YOUR_META_PIXEL_ID`.
- Successful form submission fires TikTok `SubmitForm` then `Contact`, and Meta `Lead` then `Contact`. No `Purchase` or `CompletePayment` events are sent.
- The form continues to add subscribers to Klaviyo and passes `landing`, `source`, and `creative` properties. After a successful Klaviyo response, the API also attempts to notify the shared Telegram chat.

Example test URL:

`https://tmmzc2s.rawgravity.coffee/?pixel=TEST123&fbpixel=TEST456&creative=handoff_test`

## Vercel environment variables

Set the following for Production (and Preview/Development if needed):

- `KLAVIYO_API_KEY` — full Klaviyo private API key.
- `KLAVIYO_LIST_ID` — `WWwe8f`.
- `TG_BOT_TOKEN` — Telegram bot token, configured in Vercel only. Rotate the token from the supplied PDF before production because credentials in shared files should be treated as exposed.
- `TG_CHAT_ID` — `1540072090`.

Do not commit real secrets. `.env.example` contains placeholders only.

## Hosting note

The supplied PDF describes a PHP `lead.php` endpoint which appends to `data/leads.ndjson` and uses `.htaccess`. This project remains on Vercel and retains its existing Node.js `/api/subscribe` endpoint to avoid breaking Klaviyo. It sends lead notifications to Telegram and writes structured records to Vercel function logs. Vercel deployment filesystems are read-only except for temporary `/tmp` storage, so this project does **not** claim to provide a persistent append-only `data/leads.ndjson` file. Use persistent external storage if that file is a hard requirement.
