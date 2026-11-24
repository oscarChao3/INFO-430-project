# Ship It by Noon: The one-hour Database App

You will build a small, real web app from your own idea, starting from an empty folder, by directing an AI coding assistant. Nothing in this repository is an app: it holds only **places for things** and **the rules your AI follows**, plus the location of the class database. The idea is yours, the code comes from you directing the AI, and you run it, check it, and fix it.

```
web/index.html  -->  server/server.js  -->  SQL Server (class server)
the page you see     the middle tier:        the data
                     runs SQL, returns JSON
```

The page never talks to the database. It asks your server (`/api/...`), the server runs SQL with the user's input as a **parameter**, and sends the rows back as JSON.

## What is in this repository

| Location | What goes there | Who writes it |
| --- | --- | --- |
| `IDEA.md` | One sentence: what your app does, for whom, with what data | You |
| `db/` | `schema.sql`, `load.js` (only for your own data), `queries.sql` | The AI, checked by you |
| `server/server.js` | The middle tier: Express routes that run your SQL | The AI, checked by you |
| `web/index.html` | The page | The AI, checked by you |
| `PROMPTS.md` | A short log of what you asked the AI and what you fixed | You |
| `prompts/` | The prompt for each step, to copy and adapt | Given |
| `AGENTS.md` | Rules the AI reads automatically: the architecture, parameters only, no passwords in code. Copies in `.github/copilot-instructions.md` (Copilot) and `CLAUDE.md` (Claude Code) | Given |
| `DATASETS.md` | Data to choose from | Given |
| `scripts/check-connection.js` | A setup check: can your laptop reach the class database? (`npm run check`) | Given |

## Before you start

- **Be on UW Wi-Fi or the Husky OnNet VPN.** The class server is only reachable from the UW network.
- **Node.js 20 or newer.** In a VS Code terminal, run `node -v`. If you see an error, install the LTS version from <https://nodejs.org> and restart VS Code.
- **VS Code with GitHub Copilot.** Copilot is free for verified students: apply at <https://education.github.com/pack>. Verification can take a while; until then, Copilot Free works right away. Use Copilot Chat in **Agent** mode, so it can create and edit files.

## Steps

0. **Set up (5 min).** On GitHub, click **Use this template**, then **Create a new repository** (public). In VS Code: **Source Control > Clone Repository**. In the terminal: `npm install`. Copy `.env.example` to `.env` and paste the student password from Canvas. Check your setup: `npm run check` should print **OK: connected**.
1. **Your idea (10 min).** [prompts/1_idea.md](prompts/1_idea.md)
2. **A visible website for your idea (15 min).** [prompts/2_page.md](prompts/2_page.md)
3. **The data (15 min).** [prompts/3_database.md](prompts/3_database.md)
4. **Connect the page to the data (20 min).** [prompts/4_connect.md](prompts/4_connect.md)
5. **Check it, ship it, make it yours (15 min).** [prompts/5_check.md](prompts/5_check.md)

The prompts are starting points. Change them to fit your idea, and when the AI gets something wrong, tell it exactly what you saw.

## Copilot or Claude Code?

| | GitHub Copilot (what we use in class) | Claude Code (what the instructor uses) |
| --- | --- | --- |
| Where it runs | Chat panel inside VS Code; Agent mode edits files and runs commands | Terminal, or the Claude Code extension in VS Code |
| Models | Several providers; the free Student plan picks the model for you (Auto) | Anthropic's Claude models only, which you choose |
| Price | Free for verified students (Copilot Student); Copilot Free for everyone else | Needs a paid Claude plan: Pro is about $20/month; Max costs more |
| Links | <https://github.com/features/copilot>, <https://education.github.com/pack> | <https://claude.com/product/claude-code>, <https://claude.com/pricing> |

Both read a project rules file, and both make mistakes: checking the result is your job.

## Troubleshooting

- **"getaddrinfo ENOTFOUND" or a timeout**: you are not on the UW network. Connect to Husky OnNet.
- **"Login failed for user"**: the password in `.env` is wrong or has extra spaces.
- **`EADDRINUSE` when starting**: a server is already running in another terminal. Stop it with Ctrl+C, or set `PORT=3001` in `.env`.
- **The page did not change after an edit**: restart the server (Ctrl+C, then `npm start`) and reload the page.
