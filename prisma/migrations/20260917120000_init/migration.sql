-- CreateEnum
CREATE TYPE "Position" AS ENUM ('QB', 'RB', 'WR', 'TE');
CREATE TYPE "GameStatus" AS ENUM ('scheduled', 'in_progress', 'final');
CREATE TYPE "InjuryStatusCode" AS ENUM ('HEALTHY', 'QUESTIONABLE', 'DOUBTFUL', 'OUT', 'IR', 'INACTIVE');
CREATE TYPE "ScoringFormat" AS ENUM ('ppr', 'half', 'std');
CREATE TYPE "ComparisonType" AS ENUM ('start_sit', 'add_drop');
CREATE TYPE "Indexation" AS ENUM ('index', 'noindex', 'blocked');
CREATE TYPE "QualityGateStatus" AS ENUM ('pass', 'fail', 'pending');
CREATE TYPE "ComplianceGate" AS ENUM ('RED', 'YELLOW', 'GREEN');
CREATE TYPE "RecType" AS ENUM ('start', 'sit', 'add', 'drop', 'waiver_rank');
CREATE TYPE "RunStatus" AS ENUM ('success', 'fail', 'partial');
CREATE TYPE "UncertaintyLabel" AS ENUM ('low', 'med', 'high');
CREATE TYPE "SourceClass" AS ENUM ('GREEN', 'YELLOW', 'RED', 'FIXTURE');

CREATE TABLE "teams" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "display_name_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "players" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "position" "Position" NOT NULL,
    "team_id" UUID,
    "external_ids" JSONB NOT NULL DEFAULT '{}',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "games" (
    "id" UUID NOT NULL,
    "season" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "kickoff_at" TIMESTAMP(3) NOT NULL,
    "home_team_id" UUID NOT NULL,
    "away_team_id" UUID NOT NULL,
    "status" "GameStatus" NOT NULL DEFAULT 'scheduled',
    "external_ids" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "data_source_runs" (
    "id" UUID NOT NULL,
    "source_key" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3),
    "status" "RunStatus" NOT NULL,
    "compliance_gate" "ComplianceGate" NOT NULL,
    "source_class" "SourceClass" NOT NULL DEFAULT 'FIXTURE',
    "record_counts" JSONB NOT NULL DEFAULT '{}',
    "error_summary" TEXT,
    "raw_artifact_uri" TEXT,
    CONSTRAINT "data_source_runs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "injuries_status" (
    "id" UUID NOT NULL,
    "player_id" UUID NOT NULL,
    "as_of" TIMESTAMP(3) NOT NULL,
    "status_code" "InjuryStatusCode" NOT NULL,
    "body_area" TEXT,
    "notes_source_text" TEXT,
    "source_run_id" UUID NOT NULL,
    "source_class" "SourceClass" NOT NULL DEFAULT 'FIXTURE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "injuries_status_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "player_stats_weekly" (
    "id" UUID NOT NULL,
    "player_id" UUID NOT NULL,
    "season" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "stats" JSONB NOT NULL,
    "source_run_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "player_stats_weekly_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "usage_metrics" (
    "id" UUID NOT NULL,
    "player_id" UUID NOT NULL,
    "season" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "metrics" JSONB NOT NULL,
    "derived_from" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "usage_metrics_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "projections" (
    "id" UUID NOT NULL,
    "player_id" UUID NOT NULL,
    "season" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "scoring_format" "ScoringFormat" NOT NULL,
    "points_mean" DOUBLE PRECISION NOT NULL,
    "points_floor" DOUBLE PRECISION NOT NULL,
    "points_ceiling" DOUBLE PRECISION NOT NULL,
    "uncertainty_label" "UncertaintyLabel" NOT NULL,
    "model_version" TEXT NOT NULL,
    "source_run_id" UUID,
    "computed_at" TIMESTAMP(3) NOT NULL,
    "payload" JSONB NOT NULL DEFAULT '{}',
    CONSTRAINT "projections_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "comparisons" (
    "id" UUID NOT NULL,
    "left_player_id" UUID NOT NULL,
    "right_player_id" UUID NOT NULL,
    "comparison_type" "ComparisonType" NOT NULL,
    "season" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "winner_player_id" UUID,
    "score_delta" DOUBLE PRECISION NOT NULL,
    "payload" JSONB NOT NULL,
    "model_version" TEXT NOT NULL,
    "computed_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "comparisons_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "recommendations" (
    "id" UUID NOT NULL,
    "rec_type" "RecType" NOT NULL,
    "player_id" UUID,
    "pair_left_id" UUID,
    "pair_right_id" UUID,
    "season" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "scoring_format" "ScoringFormat" NOT NULL,
    "rank" INTEGER,
    "score" DOUBLE PRECISION NOT NULL,
    "rationale_metrics" JSONB NOT NULL,
    "explanation_text" TEXT,
    "model_version" TEXT NOT NULL,
    "computed_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "pages" (
    "id" UUID NOT NULL,
    "path" TEXT NOT NULL,
    "page_type" TEXT NOT NULL,
    "entity_refs" JSONB NOT NULL DEFAULT '{}',
    "indexation" "Indexation" NOT NULL DEFAULT 'noindex',
    "quality_gate_status" "QualityGateStatus" NOT NULL DEFAULT 'pending',
    "published_at" TIMESTAMP(3),
    "rendered_at" TIMESTAMP(3),
    "canonical_path" TEXT NOT NULL,
    "comparison_id" UUID,
    "recommendation_id" UUID,
    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "verification_timestamps" (
    "id" UUID NOT NULL,
    "fact_family" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "last_verified_at" TIMESTAMP(3) NOT NULL,
    "last_source_run_id" UUID NOT NULL,
    CONSTRAINT "verification_timestamps_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "subscriptions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "plan" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "teams_slug_key" ON "teams"("slug");
CREATE UNIQUE INDEX "players_slug_key" ON "players"("slug");
CREATE INDEX "players_team_id_idx" ON "players"("team_id");
CREATE INDEX "games_season_week_idx" ON "games"("season", "week");
CREATE INDEX "injuries_status_player_id_as_of_idx" ON "injuries_status"("player_id", "as_of" DESC);
CREATE UNIQUE INDEX "player_stats_weekly_player_id_season_week_key" ON "player_stats_weekly"("player_id", "season", "week");
CREATE UNIQUE INDEX "usage_metrics_player_id_season_week_key" ON "usage_metrics"("player_id", "season", "week");
CREATE UNIQUE INDEX "projections_player_id_season_week_scoring_format_key" ON "projections"("player_id", "season", "week", "scoring_format");
CREATE UNIQUE INDEX "comparisons_type_pair_week_key" ON "comparisons"("comparison_type", "left_player_id", "right_player_id", "season", "week");
CREATE INDEX "recommendations_rec_type_season_week_scoring_format_rank_idx" ON "recommendations"("rec_type", "season", "week", "scoring_format", "rank");
CREATE UNIQUE INDEX "pages_path_key" ON "pages"("path");
CREATE INDEX "pages_page_type_indexation_idx" ON "pages"("page_type", "indexation");
CREATE INDEX "pages_published_at_idx" ON "pages"("published_at");
CREATE UNIQUE INDEX "verification_timestamps_fact_family_entity_type_entity_id_key" ON "verification_timestamps"("fact_family", "entity_type", "entity_id");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

ALTER TABLE "players" ADD CONSTRAINT "players_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "games" ADD CONSTRAINT "games_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "games" ADD CONSTRAINT "games_away_team_id_fkey" FOREIGN KEY ("away_team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "injuries_status" ADD CONSTRAINT "injuries_status_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "injuries_status" ADD CONSTRAINT "injuries_status_source_run_id_fkey" FOREIGN KEY ("source_run_id") REFERENCES "data_source_runs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "player_stats_weekly" ADD CONSTRAINT "player_stats_weekly_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "player_stats_weekly" ADD CONSTRAINT "player_stats_weekly_source_run_id_fkey" FOREIGN KEY ("source_run_id") REFERENCES "data_source_runs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "usage_metrics" ADD CONSTRAINT "usage_metrics_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "projections" ADD CONSTRAINT "projections_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "projections" ADD CONSTRAINT "projections_source_run_id_fkey" FOREIGN KEY ("source_run_id") REFERENCES "data_source_runs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "comparisons" ADD CONSTRAINT "comparisons_left_player_id_fkey" FOREIGN KEY ("left_player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "comparisons" ADD CONSTRAINT "comparisons_right_player_id_fkey" FOREIGN KEY ("right_player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "comparisons" ADD CONSTRAINT "comparisons_winner_player_id_fkey" FOREIGN KEY ("winner_player_id") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "pages" ADD CONSTRAINT "pages_comparison_id_fkey" FOREIGN KEY ("comparison_id") REFERENCES "comparisons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "pages" ADD CONSTRAINT "pages_recommendation_id_fkey" FOREIGN KEY ("recommendation_id") REFERENCES "recommendations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "verification_timestamps" ADD CONSTRAINT "verification_timestamps_last_source_run_id_fkey" FOREIGN KEY ("last_source_run_id") REFERENCES "data_source_runs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
