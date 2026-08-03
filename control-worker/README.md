# Secure publication API

This Worker is the authorization boundary for `/control/`. The public browser
never receives the GitHub App client secret or GitHub access token. It receives
only a short-lived opaque session identifier stored in `sessionStorage`.

## One-time setup

1. Create a GitHub App owned by `Timothy815`.
   - Homepage URL: `https://timothy815.github.io/cybersecurity101/`
   - Callback URL: `https://cybersecurity101-control.<your-workers-subdomain>.workers.dev/auth/callback`
   - User authorization callback: enabled
   - Repository permission: **Contents — Read and write**
   - Installation: only the `cybersecurity101` repository
   - User access token expiration: enabled
2. The allowlist is already pinned to the public numeric GitHub user ID for
   `Timothy815` (`22419708`), which is safer than relying on a renameable login.
3. Create the session namespace:
   `npx wrangler kv namespace create SESSIONS --config control-worker/wrangler.jsonc`
   and place the returned ID in `wrangler.jsonc`.
4. Add secrets without committing their values:
   `npx wrangler secret put GITHUB_CLIENT_ID --config control-worker/wrangler.jsonc`
   `npx wrangler secret put GITHUB_CLIENT_SECRET --config control-worker/wrangler.jsonc`
5. Deploy:
   `npx wrangler deploy --config control-worker/wrangler.jsonc`
6. In the GitHub repository, create an Actions variable named
   `CONTROL_API_URL` whose value is the deployed Worker origin, without a
   trailing slash. Re-run the Pages workflow.

Until this setup is complete, `/control/` is a safe read-only shell and does
not expose any publication credential.
