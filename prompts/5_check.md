# Step 5. Check it, then ship it (15 minutes)

AI-written code often runs and is still wrong. Check three things yourself:

1. **The numbers are right.** Pick one value, run the same query in VS Code, and compare with what your page shows.
2. **User input is a parameter.** Type `' OR 1=1 --` into your input. You should get no rows or a clean error, not every row. Find the line in server/server.js where your value goes in with `request.input(...)`.
3. **No secrets in git.** In VS Code Source Control, make sure `.env` is not in the list of changes.

If something is wrong, paste the exact error or the wrong output into the AI and ask it to fix it.

Then fill in [PROMPTS.md](../PROMPTS.md), commit, and push (Source Control: message, **Commit**, **Sync Changes**). Open your repository on GitHub and check that there is no `.env` file.

Then make it yours: ask for a second view, a better design, a new table, a chart. Every change: ask, check, commit.
