# Step 4. Connect the page to the data (15 minutes)

Ask the AI:

> Read IDEA.md, AGENTS.md, db/queries.sql, and public_html/index.html. Write public_html/api.php: it reads settings from data/db.php, runs my query with the user's value as a PDO prepared-statement parameter, and returns JSON. Change index.html to call api.php and show the real rows instead of the made-up ones, with a clear message on errors. Then tell me how to create data/db.php on vergil (from data/db.example.php, with the app_reader login) and copy everything over.

**Checkpoint:** open `.../myapp/api.php?...` in a browser and see JSON, then use the page and see real data. Open `.../myapp/data/db.php` and get **Forbidden**.
