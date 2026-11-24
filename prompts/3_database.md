# Step 3. The data (15 minutes)

Pick one of three ways. Every app gets its own database on the class server, named `<your NetID>_myapp`, except Menu A, which reads the class data.

**Menu C (fastest: invent it).** Set `DB_NAME=<your NetID>_myapp` in `.env` and ask the AI:

> Read IDEA.md and AGENTS.md. Design tables for my idea with primary keys, foreign keys, and sensible types, and write db/schema.sql. Write db/load.js, which creates the database [my NetID]_myapp on the class server if it does not exist, creates the tables, and inserts about 20 realistic made-up rows per table. Then write db/queries.sql with the query my app needs, using a parameter for what the user picks.

Run it with `node db/load.js`.

**Menu A (class data, already loaded).** Look at the tables in VS Code, then ask the AI:

> Read IDEA.md and AGENTS.md. My data is in the [olist / stackexchange / gtfs] database on the class server. Write db/queries.sql with the query my app needs, using a parameter like @state for what the user picks. Explain which tables it joins and why.

**Menu B (data you bring).** Download the CSV file(s) into `db/data/`, set `DB_NAME=<your NetID>_myapp` in `.env`, and ask the AI:

> Read IDEA.md and AGENTS.md. My CSV files are in db/data/. Propose tables with primary keys, foreign keys, and sensible types, and write db/schema.sql. Then write db/load.js, which creates the database [my NetID]_myapp on the class server if it does not exist, creates the tables, and loads the CSV rows using the settings in .env. Then write db/queries.sql with the query my app needs, using a parameter for what the user picks.

Run it with `node db/load.js`.

**Checkpoint:** run your query from `db/queries.sql` in VS Code (with a real value in place of the parameter) and get sensible rows. For Menu B, check one table's row count against the CSV.
