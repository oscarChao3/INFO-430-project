const fs = require("fs");
const path = require("path");
const sql = require("mssql");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const modes = [
  { name: "Ranked Solo", category: "Ranked", partySize: 1 },
  { name: "Ranked Duo", category: "Ranked", partySize: 2 },
  { name: "Ranked Squad", category: "Ranked", partySize: 3 },
  { name: "Ranked Open", category: "Ranked", partySize: 5 },
  { name: "Ranked Role Queue", category: "Ranked", partySize: 5 },
  { name: "Casual Solo", category: "Casual", partySize: 1 },
  { name: "Casual Duo", category: "Casual", partySize: 2 },
  { name: "Casual Squad", category: "Casual", partySize: 3 },
  { name: "Casual Open", category: "Casual", partySize: 5 },
  { name: "Quick Play", category: "Casual", partySize: 5 },
  { name: "Competitive Solo", category: "Competitive", partySize: 1 },
  { name: "Competitive Duo", category: "Competitive", partySize: 2 },
  { name: "Competitive Squad", category: "Competitive", partySize: 3 },
  { name: "Tournament Solo", category: "Tournament", partySize: 1 },
  { name: "Tournament Duo", category: "Tournament", partySize: 2 },
  { name: "Tournament Squad", category: "Tournament", partySize: 3 },
  { name: "Event Solo", category: "Event", partySize: 1 },
  { name: "Event Squad", category: "Event", partySize: 3 },
  { name: "Custom Lobby", category: "Custom", partySize: 5 },
  { name: "Practice Match", category: "Practice", partySize: 1 }
];

const matches = [
  { playedOn: "2026-11-01", mode: "Ranked Solo", result: "win", performance: 8.1, ratingBefore: 1200, ratingAfter: 1218, note: "Held the opening position and converted the early lead." },
  { playedOn: "2026-11-02", mode: "Ranked Duo", result: "loss", performance: 6.4, ratingBefore: 1218, ratingAfter: 1204, note: "Late rotation left the team without a safe reset." },
  { playedOn: "2026-11-02", mode: "Ranked Solo", result: "win", performance: 8.9, ratingBefore: 1204, ratingAfter: 1224, note: "Strong aim and patient decisions closed the final round." },
  { playedOn: "2026-11-04", mode: "Ranked Squad", result: "loss", performance: 5.8, ratingBefore: 1224, ratingAfter: 1212, note: "Overextended before teammates were ready to engage." },
  { playedOn: "2026-11-05", mode: "Ranked Solo", result: "win", performance: 7.7, ratingBefore: 1212, ratingAfter: 1228, note: "Good resource use kept pressure through the mid-game." },
  { playedOn: "2026-11-05", mode: "Ranked Duo", result: "win", performance: 9.0, ratingBefore: 1228, ratingAfter: 1250, note: "Clear communication made the final push decisive." },
  { playedOn: "2026-11-07", mode: "Ranked Role Queue", result: "loss", performance: 6.1, ratingBefore: 1250, ratingAfter: 1232, note: "The team composition needed more reliable frontline support." },
  { playedOn: "2026-11-09", mode: "Ranked Squad", result: "win", performance: 8.3, ratingBefore: 1232, ratingAfter: 1253, note: "Stayed grouped and secured objectives on schedule." },
  { playedOn: "2026-11-09", mode: "Ranked Solo", result: "loss", performance: 5.6, ratingBefore: 1253, ratingAfter: 1238, note: "Repeated peeks gave the opponent an easy advantage." },
  { playedOn: "2026-11-11", mode: "Competitive Solo", result: "win", performance: 8.6, ratingBefore: 1238, ratingAfter: 1262, note: "Adapted quickly after the opponent changed strategy." },
  { playedOn: "2026-11-13", mode: "Ranked Duo", result: "win", performance: 8.4, ratingBefore: 1262, ratingAfter: 1281, note: "Good timing on the shared push created space." },
  { playedOn: "2026-11-13", mode: "Ranked Solo", result: "loss", performance: 6.0, ratingBefore: 1281, ratingAfter: 1268, note: "Missed a chance to disengage and recover." },
  { playedOn: "2026-11-15", mode: "Ranked Squad", result: "win", performance: 8.8, ratingBefore: 1268, ratingAfter: 1286, note: "Consistent positioning helped the squad control the map." },
  { playedOn: "2026-11-17", mode: "Tournament Duo", result: "win", performance: 9.2, ratingBefore: 1286, ratingAfter: 1308, note: "Focused calls kept both players on the same target." },
  { playedOn: "2026-11-17", mode: "Ranked Solo", result: "loss", performance: 5.9, ratingBefore: 1308, ratingAfter: 1292, note: "A risky flank separated the player from support." },
  { playedOn: "2026-11-19", mode: "Ranked Duo", result: "win", performance: 8.2, ratingBefore: 1292, ratingAfter: 1312, note: "Saved resources for a well-timed late push." },
  { playedOn: "2026-11-21", mode: "Ranked Squad", result: "loss", performance: 6.4, ratingBefore: 1312, ratingAfter: 1298, note: "The squad rotated late and lost control of the objective." },
  { playedOn: "2026-11-21", mode: "Ranked Solo", result: "win", performance: 9.1, ratingBefore: 1298, ratingAfter: 1322, note: "Strong recovery after an uneven start." },
  { playedOn: "2026-11-22", mode: "Ranked Duo", result: "win", performance: 8.5, ratingBefore: 1322, ratingAfter: 1339, note: "Patient teamwork avoided unnecessary fights." },
  { playedOn: "2026-11-24", mode: "Ranked Solo", result: "loss", performance: 6.2, ratingBefore: 1339, ratingAfter: 1320, note: "Review rotation timing before committing to the next fight." }
];

async function main() {
  const database = process.env.DB_NAME || "";
  if (!/^[A-Za-z][A-Za-z0-9_]*_myapp$/.test(database)) {
    throw new Error("Set DB_NAME in .env to your own <NetID>_myapp database before loading data.");
  }

  const pool = await sql.connect({
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT || 1433),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database,
    options: { encrypt: true, trustServerCertificate: true }
  });

  try {
    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
    await pool.request().batch(schema);

    const transaction = new sql.Transaction(pool);
    let shouldSeedMatches = false;
    await transaction.begin();
    try {
      for (const mode of modes) {
        await new sql.Request(transaction)
          .input("modeName", sql.NVarChar(60), mode.name)
          .input("category", sql.NVarChar(20), mode.category)
          .input("partySize", sql.TinyInt, mode.partySize)
          .query(`
            IF NOT EXISTS (
              SELECT 1 FROM dbo.MatchModes WHERE ModeName = @modeName
            )
            BEGIN
              INSERT INTO dbo.MatchModes (ModeName, Category, PartySize)
              VALUES (@modeName, @category, @partySize);
            END;
          `);
      }

      const countResult = await new sql.Request(transaction)
        .query("SELECT COUNT_BIG(*) AS matchCount FROM dbo.Matches;");
      shouldSeedMatches = Number(countResult.recordset[0].matchCount) === 0;

      if (shouldSeedMatches) {
        for (const match of matches) {
          const result = await new sql.Request(transaction)
            .input("playedOn", sql.Date, new Date(`${match.playedOn}T00:00:00.000Z`))
            .input("modeName", sql.NVarChar(60), match.mode)
            .input("result", sql.NVarChar(4), match.result)
            .input("performance", sql.Decimal(3, 1), match.performance)
            .input("ratingBefore", sql.Int, match.ratingBefore)
            .input("ratingAfter", sql.Int, match.ratingAfter)
            .input("note", sql.NVarChar(250), match.note)
            .query(`
              INSERT INTO dbo.Matches
                (ModeID, PlayedOn, Result, Performance, RatingBefore, RatingAfter, Note)
              SELECT ModeID, @playedOn, @result, @performance, @ratingBefore, @ratingAfter, @note
              FROM dbo.MatchModes
              WHERE ModeName = @modeName;
            `);

          if (result.rowsAffected[0] !== 1) {
            throw new Error(`Could not find match mode "${match.mode}" while loading sample matches.`);
          }
        }
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

    const counts = await pool.request().query(`
      SELECT
        (SELECT COUNT_BIG(*) FROM dbo.MatchModes) AS modeCount,
        (SELECT COUNT_BIG(*) FROM dbo.Matches) AS matchCount;
    `);
    const { modeCount, matchCount } = counts.recordset[0];
    console.log(`OK: ${modeCount} match modes and ${matchCount} matches are ready in ${database}.`);
    if (!shouldSeedMatches) {
      console.log("Existing match rows were left unchanged; sample matches are only added to an empty table.");
    }
  } finally {
    await pool.close();
  }
}

main().catch((error) => {
  console.error(`FAILED to load match data: ${error.message}`);
  process.exitCode = 1;
});
