import { PrismaClient, type Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import {
  FIXTURE_COMPUTED_AT,
  FIXTURE_RUN,
  FIXTURE_SEASON,
  FIXTURE_VERIFIED_AT,
  FIXTURE_WEEK,
  GAMES,
  INJURIES,
  PLAYERS,
  TEAMS,
  USAGE,
  WEEKLY_STATS,
} from "../src/lib/fixtures";
import { getAddDropPairs, getProjection, getStartSitPairs } from "../src/lib/data";
import { getDefaultFormat } from "../src/lib/site";

const prisma = new PrismaClient();

async function main() {
  await prisma.page.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.comparison.deleteMany();
  await prisma.projection.deleteMany();
  await prisma.verificationTimestamp.deleteMany();
  await prisma.usageMetric.deleteMany();
  await prisma.playerStatsWeekly.deleteMany();
  await prisma.injuryStatus.deleteMany();
  await prisma.game.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();
  await prisma.dataSourceRun.deleteMany();

  await prisma.dataSourceRun.create({
    data: {
      id: FIXTURE_RUN.id,
      sourceKey: FIXTURE_RUN.sourceKey,
      startedAt: new Date(FIXTURE_RUN.startedAt),
      finishedAt: new Date(FIXTURE_RUN.finishedAt),
      status: FIXTURE_RUN.status,
      complianceGate: FIXTURE_RUN.complianceGate,
      sourceClass: FIXTURE_RUN.sourceClass,
      recordCounts: {
        teams: TEAMS.length,
        players: PLAYERS.length,
        games: GAMES.length,
      },
    },
  });

  for (const team of TEAMS) {
    await prisma.team.create({
      data: {
        id: team.id,
        slug: team.slug,
        displayNameText: team.displayNameText,
      },
    });
  }

  for (const player of PLAYERS) {
    await prisma.player.create({
      data: {
        id: player.id,
        slug: player.slug,
        displayName: player.displayName,
        position: player.position,
        teamId: player.teamId,
        active: player.active,
        externalIds: { fixture: player.slug },
      },
    });
  }

  for (const game of GAMES) {
    await prisma.game.create({
      data: {
        id: game.id,
        season: game.season,
        week: game.week,
        kickoffAt: new Date(game.kickoffAt),
        homeTeamId: game.homeTeamId,
        awayTeamId: game.awayTeamId,
        status: game.status,
      },
    });
  }

  for (const row of INJURIES) {
    await prisma.injuryStatus.create({
      data: {
        id: randomUUID(),
        playerId: row.playerId,
        asOf: new Date(row.asOf),
        statusCode: row.statusCode,
        bodyArea: row.bodyArea,
        notesSourceText: row.notesSourceText,
        sourceRunId: row.sourceRunId,
        sourceClass: row.sourceClass,
      },
    });
    await prisma.verificationTimestamp.create({
      data: {
        id: randomUUID(),
        factFamily: "injury_status",
        entityType: "player",
        entityId: row.playerId,
        lastVerifiedAt: new Date(FIXTURE_VERIFIED_AT),
        lastSourceRunId: FIXTURE_RUN.id,
      },
    });
  }

  for (const row of WEEKLY_STATS) {
    await prisma.playerStatsWeekly.create({
      data: {
        id: randomUUID(),
        playerId: row.playerId,
        season: row.season,
        week: row.week,
        stats: row.stats as unknown as Prisma.InputJsonValue,
        sourceRunId: FIXTURE_RUN.id,
      },
    });
  }

  for (const row of USAGE) {
    await prisma.usageMetric.create({
      data: {
        id: randomUUID(),
        playerId: row.playerId,
        season: row.season,
        week: row.week,
        metrics: row.metrics as unknown as Prisma.InputJsonValue,
      },
    });
  }

  const format = getDefaultFormat();
  for (const player of PLAYERS) {
    const projection = getProjection(player, FIXTURE_WEEK, format);
    await prisma.projection.create({
      data: {
        id: randomUUID(),
        playerId: player.id,
        season: FIXTURE_SEASON,
        week: FIXTURE_WEEK,
        scoringFormat: format,
        pointsMean: projection.pointsMean,
        pointsFloor: projection.pointsFloor,
        pointsCeiling: projection.pointsCeiling,
        uncertaintyLabel: projection.uncertaintyLabel,
        modelVersion: projection.modelVersion,
        sourceRunId: FIXTURE_RUN.id,
        computedAt: new Date(FIXTURE_COMPUTED_AT),
        payload: projection.components as unknown as Prisma.InputJsonValue,
      },
    });
  }

  for (const pair of getStartSitPairs()) {
    const rec = (await import("../src/lib/data")).getStartSitRecommendation(pair.left, pair.right);
    await prisma.comparison.create({
      data: {
        id: randomUUID(),
        leftPlayerId: pair.left.id,
        rightPlayerId: pair.right.id,
        comparisonType: "start_sit",
        season: FIXTURE_SEASON,
        week: FIXTURE_WEEK,
        winnerPlayerId: rec.winnerPlayerId,
        scoreDelta: rec.scoreDelta,
        payload: {
          leftMean: rec.leftProjection.pointsMean,
          rightMean: rec.rightProjection.pointsMean,
        },
        modelVersion: rec.modelVersion,
        computedAt: new Date(rec.computedAt),
      },
    });
  }

  for (const pair of getAddDropPairs()) {
    const rec = (await import("../src/lib/data")).getAddDropRecommendation(pair.left, pair.right);
    await prisma.comparison.create({
      data: {
        id: randomUUID(),
        leftPlayerId: pair.left.id,
        rightPlayerId: pair.right.id,
        comparisonType: "add_drop",
        season: FIXTURE_SEASON,
        week: FIXTURE_WEEK,
        winnerPlayerId: rec.addPlayerId,
        scoreDelta: rec.scoreDelta,
        payload: {
          leftMean: rec.leftProjection.pointsMean,
          rightMean: rec.rightProjection.pointsMean,
        },
        modelVersion: rec.modelVersion,
        computedAt: new Date(rec.computedAt),
      },
    });
  }

  console.log("Seeded Decide Football fixture set (not live data).");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
