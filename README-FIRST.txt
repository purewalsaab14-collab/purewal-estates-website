PUREWAL ESTATES — FREE WEBSITE + ADMIN DASHBOARD
================================================

WHAT'S INCLUDED
- Public website: index.html
- Property listing section connected to Supabase: listings.js
- Private admin login/dashboard: admin.html + admin.js
- Supabase database/storage setup: supabase-setup.sql
- Browser-safe Supabase config placeholder: config.js

FREE SERVICES TO CREATE
1. GitHub account: https://github.com/
2. Cloudflare account: https://dash.cloudflare.com/
3. Supabase account: https://supabase.com/dashboard

IMPORTANT SECURITY
- Never put a Supabase service_role/secret key in config.js or any browser code.
- Only use the anon/public key in config.js.
- Disable public sign-ups in Supabase Authentication settings after creating your admin user.
- Create the admin user yourself in Supabase Dashboard > Authentication > Users > Add user.
- Keep the admin email/password private.
- The SQL policies let authenticated users manage records, so public sign-ups MUST remain disabled.
- Use a strong unique password and enable MFA if available.

SETUP ORDER
A. Supabase
1. Create a Supabase project on the Free plan.
2. Open SQL Editor > New query. Paste all of supabase-setup.sql and run it.
3. Open Project Settings > API (or Connect). Copy Project URL and anon/public key.
4. Open Authentication > Users and add your own admin user. Do not enable public sign-ups.
5. Paste Project URL and anon/public key into config.js. Never use service_role/secret key.
6. If confirmation emails prevent first login, configure the Auth user as confirmed from the dashboard, if that option is shown.

B. GitHub
1. Create a new repository named purewal-estates-website.
2. Upload every file in this folder to the repository root (not inside another nested folder).
3. Ensure index.html is in the repository root.

C. Cloudflare Pages
1. In Cloudflare, open Workers & Pages > Create application > Pages > Connect to Git.
2. Connect GitHub and select purewal-estates-website.
3. Framework preset: None. Build command: leave blank. Build output directory: / (or the repository root, if the UI asks).
4. Deploy. Cloudflare will assign a pages.dev address. Choose a project slug if prompted; availability is not guaranteed.
5. Open the deployed address and test the public site.
6. Admin URL is your site address plus /admin.html.

ADMIN USE
- Log in at /admin.html.
- Add a property, select category/status, enter location/area/price and optionally upload a photo.
- Save. Available listings appear on the public homepage.
- Mark a listing Sold/Rented/Under offer to hide it from the public Available listings. It remains in admin.
- Edit or delete from Manage properties.

NOTES / LIMITS
- This is a static frontend with Supabase backend, not a paid CMS.
- Supabase Free currently includes 500 MB database, 1 GB storage and may pause projects after a week of inactivity. Check current plan terms.
- Cloudflare Pages has a free tier; usage limits apply.
- No custom .in domain is included. A pages.dev address is free.
- The form sends enquiries to WhatsApp; it does not store visitor leads in a CRM.
- This starter does not provide automatic backups. Keep copies of important listing information and photos.
- Test admin access and listing visibility before sharing the site publicly.
