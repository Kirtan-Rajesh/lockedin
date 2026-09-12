# lockedin

lockedin is a job search workspace for early-career software engineers. It collects relevant openings, checks each job description against your profile, helps tailor your résumé, and keeps your applications organized.

## Features

- Job discovery across company feeds and direct career pages
- Fit checks for skills, experience, graduation, and compensation signals
- Personal résumé library with editable LaTeX or plain text
- Live LaTeX editor with browser PDF preview and downloads
- AI résumé reviewer with exact before-and-after changes, explanations, apply, and undo
- Application pipeline with status, notes, and follow-up dates
- Duplicate suppression and automatic hiding of tracked jobs
- Per-user workspace data

## Run locally

Requirements: Node.js 22 or newer.

```sh
git clone https://github.com/Kirtan-Rajesh/lockedin.git
cd lockedin
npm install
npm run dev
```

Open the local URL printed by the dev server.

## Configure the AI reviewer

Copy `.env.example` to `.env.local` and add your own key:

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1-mini
```

Keep `.env.local` private. Never commit an API key. If no key is configured, lockedin uses a local evidence-based résumé review instead.

## How workspace data works

The hosted version uses the platform's authenticated user identity. Local clones use a browser workspace ID, so users get separate résumés, settings, and application pipelines in the same installation.

Use **Your résumé** to upload or paste your base résumé. Open a job and select **Build tailored résumé** to edit a job-specific copy in Résumé Studio. After applying on the employer's website, update the role status in the drawer; tracked roles remain in **Pipeline** and are hidden from **Discover** by default.

## Checks

```sh
npm run build
npx tsc --noEmit
```

## License

No license has been selected yet. Add one before distributing lockedin under an open-source license.
