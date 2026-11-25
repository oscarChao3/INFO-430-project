# What I asked the AI

Keep a short log. One entry per prompt is enough.

| What I asked (paste or summarize) | What happened | What I had to fix or check |
| --- | --- | --- |
| Enter solo in the app and compare the results with the SQL query using the same value. | The app displayed results for solo. | I checked whether the rows and values on the page matched the SQL query results. |
| Test the filter with several inputs containing special characters. | The app displayed “No matches found for these filters.” | I checked that the special input did not return all rows or crash the page. |
| Ask whether seeing .env in VS Code Explorer meant it would be committed. | git ls-files -- .env returned nothing. git check-ignore -v -- .env showed that line 2 of .gitignore ignores .env. | I confirmed that .env is untracked and ignored, so I kept my local copy. |

