# Preview Deployments (Cloudflare Pages)

Per-PR preview deployments are served by Cloudflare Pages (Direct Upload). Production stays on GitHub Pages (Fastly) and is never modified by this setup.

Previews are built only when website-content or build-affecting files change (see `paths:` filter in `.github/workflows/preview.yml`). They are automatically deleted when the PR is closed or merged.

## One-time setup (human steps)

Complete these steps once before the first preview deploy can run.

### 1. Create the Cloudflare Pages project

```bash
npx wrangler@4.101.0 pages project create devcult-preview --production-branch=main
```

Alternatively, the first `wrangler pages deploy` will create the project automatically if it does not exist.

### 2. Create a Cloudflare API token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > Profile > API Tokens.
2. Create a token with the **Cloudflare Pages: Edit** permission (least privilege).
3. Note your **Account ID** from the right sidebar of the Cloudflare dashboard homepage.

### 3. Add GitHub repository secrets

In your GitHub repository go to **Settings > Secrets and variables > Actions** and add:

| Secret name             | Value                      |
| ----------------------- | -------------------------- |
| `CLOUDFLARE_API_TOKEN`  | The API token from step 2  |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID |

### 4. Enable Cloudflare Access on preview deployments

1. In the Cloudflare dashboard go to **Workers & Pages > devcult-preview > Settings**.
2. Under **Access policy**, enable Cloudflare Access for preview deployments.
3. Add the allowed email addresses (or an email domain rule) for reviewers.

This ensures preview URLs are not publicly accessible.

## Reading the preview URL

When a PR is opened or updated (and the path filter matches), the workflow posts a comment on the PR with the preview URL. On subsequent pushes to the same PR the comment is updated in place — no duplicates.

## Limitations

- Previews are only built when `src/**`, `public/**`, or build-affecting files (`package.json`, `package-lock.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`) change.
- On PR close/merge all deletable deployments for the branch are removed. The Cloudflare Pages API may refuse to delete the latest deployment if it has an active alias; in that case a log message is emitted and the workflow exits 0. That single residual deployment stays (Access-protected + noindex) until manually deleted — Cloudflare Pages does not auto-expire deployments.
- Fork PRs do not receive preview deployments (secrets are withheld by GitHub — this is intentional).

## Rollback

To remove the preview pipeline entirely:

1. Delete `.github/workflows/preview.yml`.
2. Delete `.github/workflows/preview-teardown.yml`.
3. Delete `public/_headers` X-Robots-Tag line (or the whole file if it was added solely for this).
4. In the Cloudflare dashboard, delete the `devcult-preview` Pages project.

Production (GitHub Pages) is untouched throughout; no rollback is needed for prod.
