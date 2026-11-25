-- Change these values to test the same filters used by the app.
DECLARE @search nvarchar(100) = N'';
DECLARE @result nvarchar(4) = N'all';

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
