IF OBJECT_ID(N'dbo.MatchModes', N'U') IS NULL
BEGIN
  CREATE TABLE dbo.MatchModes (
    ModeID int IDENTITY(1,1) NOT NULL,
    ModeName nvarchar(60) NOT NULL,
    Category nvarchar(20) NOT NULL,
    PartySize tinyint NOT NULL,
    CONSTRAINT PK_MatchModes PRIMARY KEY (ModeID),
    CONSTRAINT UQ_MatchModes_ModeName UNIQUE (ModeName),
    CONSTRAINT CK_MatchModes_PartySize CHECK (PartySize BETWEEN 1 AND 5)
  );
END;

IF OBJECT_ID(N'dbo.Matches', N'U') IS NULL
BEGIN
  CREATE TABLE dbo.Matches (
    MatchID int IDENTITY(1,1) NOT NULL,
    ModeID int NOT NULL,
    PlayedOn date NOT NULL,
    Result nvarchar(4) NOT NULL,
    Performance decimal(3,1) NOT NULL,
    RatingBefore int NOT NULL,
    RatingAfter int NOT NULL,
    RatingChange AS (RatingAfter - RatingBefore) PERSISTED,
    Note nvarchar(250) NOT NULL,
    CONSTRAINT PK_Matches PRIMARY KEY (MatchID),
    CONSTRAINT FK_Matches_MatchModes FOREIGN KEY (ModeID)
      REFERENCES dbo.MatchModes (ModeID),
    CONSTRAINT CK_Matches_Result CHECK (Result IN (N'win', N'loss')),
    CONSTRAINT CK_Matches_Performance CHECK (Performance BETWEEN 0.0 AND 10.0),
    CONSTRAINT CK_Matches_Ratings CHECK (RatingBefore >= 0 AND RatingAfter >= 0)
  );
END;

IF NOT EXISTS (
  SELECT 1
  FROM sys.indexes
  WHERE object_id = OBJECT_ID(N'dbo.Matches')
    AND name = N'IX_Matches_PlayedOn'
)
BEGIN
  CREATE INDEX IX_Matches_PlayedOn
    ON dbo.Matches (PlayedOn DESC, MatchID DESC);
END;
