import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Tabela de Favoritos de Jogos
export const gameFavorites = mysqlTable("game_favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  gameId: varchar("gameId", { length: 255 }).notNull(),
  gameTitle: text("gameTitle"),
  gameImage: text("gameImage"),
  gamePrice: varchar("gamePrice", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GameFavorite = typeof gameFavorites.$inferSelect;
export type InsertGameFavorite = typeof gameFavorites.$inferInsert;

// Tabela de Favoritos de Animes
export const animeFavorites = mysqlTable("anime_favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  animeId: int("animeId").notNull(),
  animeTitle: text("animeTitle"),
  animeImage: text("animeImage"),
  animeScore: varchar("animeScore", { length: 10 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AnimeFavorite = typeof animeFavorites.$inferSelect;
export type InsertAnimeFavorite = typeof animeFavorites.$inferInsert;