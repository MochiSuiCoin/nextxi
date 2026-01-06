-- CreateTable
CREATE TABLE "programmes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "programme_name" TEXT NOT NULL,
    "provider_name" TEXT NOT NULL,
    "sport_type" TEXT NOT NULL,
    "programme_type" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "ages_min" INTEGER,
    "ages_max" INTEGER,
    "gender" TEXT,
    "level" TEXT NOT NULL,
    "boarding" TEXT,
    "duration" TEXT NOT NULL,
    "price_range" TEXT NOT NULL,
    "inclusions" TEXT NOT NULL,
    "operator_type" TEXT NOT NULL,
    "verification_notes" TEXT NOT NULL,
    "official_website" TEXT NOT NULL,
    "source_confidence" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
