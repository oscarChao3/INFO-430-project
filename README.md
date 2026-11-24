# Ship It by Noon: The one-hour Database App

You will put a real database-backed web app on the public web, from your own idea, in about an hour. Nothing in this repository is an app. It holds only **places for things** and **the rules your AI assistant follows**. The idea is yours; the code comes from you directing the AI; the only things provided are UW's free infrastructure:

```
Browser  -->  index.html + api.php      -->  your own MySQL server
              students.washington.edu         on vergil (UW Shared Web Hosting)
              (UW's web server, PHP)
```

The page never talks to the database. It asks `api.php`, which runs SQL with the user's input as a **parameter** and returns rows as JSON.

## Before class (5 minutes, do this first)

Turn on UW web hosting for your NetID: go to <https://uwnetid.washington.edu/manage/>, click **Computing Services**, check **Vergil Account** and **Student Web Publishing**, and click **Subscribe**. It is off by default.

You also need VS Code with GitHub Copilot (free for verified students at <https://education.github.com/pack>; Copilot Free works until you are verified). Use Copilot Chat in **Agent** mode, so it can create files and run commands.

## Steps

0. **Your repository (5 min).** On GitHub, click **Use this template**, then **Create a new repository**. In VS Code: **Source Control > Clone Repository**.
1. **A visible website for your idea (15 min).** [prompts/1_page.md](prompts/1_page.md)
2. **Your own database server (10 min).** [prompts/2_database.md](prompts/2_database.md)
3. **Your data (15 min).** [prompts/3_data.md](prompts/3_data.md), with help finding data in [DATASETS.md](DATASETS.md)
4. **Connect the page to the data (15 min).** [prompts/4_api.md](prompts/4_api.md)
5. **Check it, ship it, make it yours (15 min).** [prompts/5_check.md](prompts/5_check.md)

The prompts are starting points: change them to fit your idea. When the AI gets something wrong, tell it exactly what you saw. Keep a short log in [PROMPTS.md](PROMPTS.md).

## What is here

| Location | What goes there |
| --- | --- |
| `IDEA.md` | Your idea, in one sentence |
| `public_html/` | Your site: `index.html` (the page), `api.php` (the middle tier). Copied to `~/public_html/myapp/` on vergil |
| `public_html/data/` | `db.php` with your database login, on vergil only. Blocked from the web by `.htaccess`, ignored by git |
| `db/` | `schema.sql`, `load.sql`, `queries.sql`; your CSVs in `db/data/` (ignored by git) |
| `AGENTS.md` | Rules the AI reads automatically (copies: `.github/copilot-instructions.md`, `CLAUDE.md`) |
| `PROMPTS.md` | Your log of what you asked and what you fixed |

## Copilot or Claude Code?

| | GitHub Copilot (what we use in class) | Claude Code (what the instructor uses) |
| --- | --- | --- |
| Where it runs | Chat panel inside VS Code; Agent mode edits files and runs commands | Terminal, or the Claude Code extension in VS Code |
| Models | Several providers; the free Student plan picks the model for you (Auto) | Anthropic's Claude models only, which you choose |
| Price | Free for verified students (Copilot Student); Copilot Free for everyone else | Needs a paid Claude plan: Pro is about $20/month; Max costs more |
| Links | <https://github.com/features/copilot>, <https://education.github.com/pack> | <https://claude.com/product/claude-code>, <https://claude.com/pricing> |

## Limits to know

- MySQL on vergil is version 5.7: no `WITH` (CTEs) and no window functions.
- The class SQL Server is not reachable from UW web hosting, so this app uses your own MySQL and your own data.
- Free UW hosting is for class and personal projects; keep the data public and small.
