# Pick your data

## Menu A: already on the class server (fastest)

No loading needed. Connect in VS Code and look at the tables.

| Database | What it is |
| --- | --- |
| `olist` | Brazilian online store: orders, order items, products, sellers, customers, reviews |
| `stackexchange` | Questions, answers, users, votes, and tags from a Stack Exchange site |
| `gtfs` | King County Metro transit schedule: routes, trips, stops, stop times |

## Menu B: public data you load yourself

The AI writes the loader (step 2). Pick something with **two or more files that connect**, or one file with enough columns to group and filter, and keep it under about 50 MB.

| Data | Files | Link |
| --- | --- | --- |
| Tate art collection | `artwork.csv` + `artists.csv` | <https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-01-12> |
| Chinook music store | artists, albums, tracks, customers, invoices (11 tables) | <https://github.com/lerocha/chinook-database> |
| FiveThirtyEight data | Hundreds of single-table datasets behind news stories | <https://github.com/fivethirtyeight/data> |
| TidyTuesday | A new dataset every week since 2018, many with several files | <https://github.com/rfordatascience/tidytuesday> |
| Seattle Open Data | City data: permits, pet licenses, 911 calls, and more (export as CSV) | <https://data.seattle.gov> |

Avoid sites that need a login to download (such as Kaggle), so your app can be rebuilt by anyone from your repository.
