# Step 3. Your data (15 minutes)

Download your CSV file(s) into `db/data/` (git ignores that folder). Then ask the AI:

> Read IDEA.md and AGENTS.md. My CSV files are in db/data/. Look at their columns, then propose tables with primary keys, foreign keys, and sensible types, and write db/schema.sql. Write db/load.sql to load the CSVs with LOAD DATA LOCAL INFILE. Give me the commands to copy these files to vergil and run them. Then write db/queries.sql with the query my app needs, using one value the user picks.

**Checkpoint:** on vergil, run your query from `db/queries.sql` with a real value and get sensible rows. Check one table's row count against the CSV.
