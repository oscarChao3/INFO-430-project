# Rules for AI coding assistants (GitHub Copilot, Claude Code, and others)

This is a student project for INFO 430 (database systems) at the UW iSchool. The student is building their own web app, from their own idea, by directing you. Many students are new to web development: explain each change in plain language, and tell them exactly what to run and how to check it. When a command must be run on vergil, say so clearly.

## Where things run (UW Shared Web Hosting)
```
Browser  -->  public_html/index.html and api.php   -->  MySQL 5.7, the student's own server
              (UW web server, PHP 7.4, per request)      (runs in their vergil account)
```
- Public URL: `https://students.washington.edu/<netid>/` serves the student's `~/public_html` on vergil. This app lives in `~/public_html/myapp/`, at `https://students.washington.edu/<netid>/myapp/`.
- Shell: `ssh <netid>@vergil.u.washington.edu` (UW NetID password; may ask for Duo). Copy files with `scp` or `rsync` from the laptop. The local repository folder `public_html/` maps to `~/public_html/myapp/` on vergil.
- Database: the student's own MySQL 5.7 server, created on vergil with UW's installer `/usr/local/bin/mysql-local-setup`. Use the host name and port it prints. The web server connects over TCP, not a socket.
- PHP 7.4 with PDO MySQL is available. There is no Node.js on vergil, and no long-running web server: the middle tier is PHP files that run once per request.
- The class SQL Server is not reachable from UW hosting. Data comes from public CSV files the student loads into their MySQL.

## Files
- `IDEA.md`: the student's idea. Read it first.
- `public_html/index.html`: the page (plain HTML, CSS, JavaScript). It calls `api.php` with `fetch` and never talks to the database.
- `public_html/api.php`: the middle tier. Reads settings from `data/db.php`, runs SQL with PDO prepared statements, returns JSON.
- `public_html/data/db.php`: host, port, database, user, password. Exists only on vergil, never in git. `data/.htaccess` blocks web access to this folder. Template: `data/db.example.php`.
- `db/schema.sql` (tables), `db/load.sql` (loads CSVs with `LOAD DATA LOCAL INFILE`), `db/queries.sql` (the app's queries, to run by hand).

## Rules
- Every value from the user goes into SQL through a PDO prepared statement with a placeholder. Never build SQL by joining strings.
- Never put a password in any file that git tracks. Never print passwords in chat.
- The web app connects as a read-only MySQL user (SELECT only on the student's database). Loading data uses the student's admin login, from the shell.
- MySQL 5.7 has no `WITH` (CTEs) and no window functions. Use subqueries and joins instead.
- Database name: `<netid>_myapp`.
- Keep it small: one page, one PHP file to start, no frameworks, no build step. The student will iterate from there.
