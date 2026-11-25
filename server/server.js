const path = require("path");
const express = require("express");
const sql = require("mssql");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const app = express();
const webDirectory = path.join(__dirname, "..", "web");
let poolPromise;

function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect({
      server: process.env.DB_SERVER,
      port: Number(process.env.DB_PORT || 1433),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      options: { encrypt: true, trustServerCertificate: true }
    }).catch((error) => {
      poolPromise = null;
      throw error;
    });
  }
  return poolPromise;
}

app.get("/api/matches", async (request, response) => {
  const searchValue = request.query.search;
  const resultValue = request.query.result;

  if (
    (searchValue !== undefined && typeof searchValue !== "string")
    || (resultValue !== undefined && typeof resultValue !== "string")
  ) {
    return response.status(400).json({ error: "Search and result filters must be single text values." });
  }

  const search = (searchValue || "").trim();
  const resultFilter = (resultValue || "all").trim().toLowerCase();
  if (search.length > 100) {
    return response.status(400).json({ error: "Search must be 100 characters or fewer." });
  }
  if (!["all", "win", "loss"].includes(resultFilter)) {
    return response.status(400).json({ error: "Result must be all, win, or loss." });
  }

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input("search", sql.NVarChar(100), search)
      .input("result", sql.NVarChar(4), resultFilter)
      .query(`
        SELECT
          m.MatchID AS id,
          CONVERT(char(10), m.PlayedOn, 23) AS playedOn,
          mode.ModeName AS mode,
          m.Result AS result,
          CONVERT(float, m.Performance) AS performance,
          m.RatingBefore AS ratingBefore,
          m.RatingAfter AS ratingAfter,
          m.RatingChange AS ratingChange,
          m.Note AS note
        FROM dbo.Matches AS m
        INNER JOIN dbo.MatchModes AS mode
          ON mode.ModeID = m.ModeID
        WHERE
          (@search = N''
            OR CHARINDEX(@search, mode.ModeName) > 0
            OR CHARINDEX(@search, m.Note) > 0)
          AND (@result = N'all' OR m.Result = @result)
        ORDER BY m.PlayedOn DESC, m.MatchID DESC;
      `);

    return response.json(result.recordset);
  } catch (error) {
    console.error(`GET /api/matches failed: ${error.message}`);
    return response.status(500).json({ error: "Could not load matches from the database." });
  }
});

app.use(express.static(webDirectory));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Matchlog is running at http://localhost:${port}`);
});
