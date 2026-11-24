# Step 5. Check it, ship it, then make it yours (15 minutes)

AI-written code often runs and is still wrong. Check three things yourself:

1. **The numbers are right.** Run your query by hand on vergil with one value and compare with the page.
2. **User input is a parameter.** Type `' OR 1=1 --` into your input. You should get no rows or a clean error, not every row. Find the line in api.php where your value is bound to a placeholder.
3. **No secrets in git.** In VS Code Source Control, make sure `data/db.php` and your CSVs are not in the list of changes.

Fill in [PROMPTS.md](../PROMPTS.md), commit, and push.

Then iterate. Ask for a second view, a better design, a new table, a chart. Every change: ask, check, copy to vergil, reload.
