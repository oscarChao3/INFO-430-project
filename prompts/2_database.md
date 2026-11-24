# Step 2. Your own database server (10 minutes)

Ask the AI:

> Read AGENTS.md. Walk me through creating my own MySQL server on vergil with UW's /usr/local/bin/mysql-local-setup, one command at a time, and explain each answer it asks for. Then create the database <my NetID>_myapp, and a read-only user app_reader that can only SELECT from it. Make sure the server restarts by itself if vergil reboots.

Write down the host and port it prints. Keep passwords in a password manager, not in your repository.

**Checkpoint:** on vergil, `mysql` connects and `SHOW DATABASES;` lists `<NetID>_myapp`.
