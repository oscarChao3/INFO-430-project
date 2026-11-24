# Rules for AI coding assistants (GitHub Copilot, Claude Code, and others)

This is a student project for INFO 430 (database systems) at the UW iSchool. The student is building their own small web app with your help. Many students are new to web development: explain each change in plain language, and tell them exactly how to run and test it.

## Architecture (keep to it)
```
web/index.html  -->  server/server.js  -->  SQL Server (class server)
the page             Node + Express        the database
```
- `web/` holds the page: plain HTML, CSS, and JavaScript. The page only calls this app's own `/api/...` routes with `fetch`. It never talks to the database.
- `server/server.js` is a Node + Express server. It serves `web/` as static files and has `/api/...` routes. Each route runs SQL and returns JSON.
- `db/` holds SQL: `schema.sql` (CREATE TABLE statements), any load script (`load.js`) that reads CSV files and inserts rows, and `queries.sql` (the queries the app uses, so the student can run them in VS Code).
- Connection settings come from `.env` (see `.env.example`), read with `dotenv`. Packages available: `express`, `mssql`, `dotenv`. Ask before adding others.
- `scripts/check-connection.js` shows the connection settings that work for the class server (encrypt true, trustServerCertificate true).

## Database
- SQL Server 2022 on `is-info430.ischool.uw.edu`, reached only from UW Wi-Fi or the Husky OnNet VPN.
- Class datasets (read-only): databases `olist`, `stackexchange`, `gtfs`. Use three-part names, like `olist.dbo.sellers`.
- A student loading their own data creates their own database named `<NetID>_myapp` and creates tables there. Never create or change anything in `olist`, `stackexchange`, or `gtfs`.
- Use SQL Server (T-SQL) syntax: `TOP (n)`, not `LIMIT`.

## Rules
- Any value that comes from the user goes into SQL as a parameter (`request.input('name', sql.NVarChar(100), value)` and `@name` in the SQL). Never build SQL by pasting strings together.
- Never put a password in code. Never commit `.env`.
- Keep it small: one HTML file, one server file, no frameworks, no build step.
- When you change something, add one line to `PROMPTS.md` only if the student asks; the student keeps that log.
