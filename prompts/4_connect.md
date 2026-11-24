# Step 4. Connect the page to the data (20 minutes)

Ask the AI:

> Read IDEA.md, AGENTS.md, db/queries.sql, server/server.js, and web/index.html. Add two routes to server/server.js: GET /api/health (shows which database it is connected to) and GET /api/[name]?[param]=..., which runs my query with the user's value passed as a SQL parameter and returns the rows as JSON. Then change web/index.html to call that route and show the real rows instead of the made-up ones, with a clear message if the request fails.

Restart the server (Ctrl+C, then `npm start`). Open your `/api/...` URL in the browser to see the raw JSON, then use the page.

**Checkpoint:** your page shows real rows from the database, and they change when you change the input.
