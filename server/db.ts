import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, gameFavorites, animeFavorites, GameFavorite, AnimeFavorite, InsertGameFavorite, InsertAnimeFavorite } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// Funcoes de Favoritos de Jogos
export async function addGameFavorite(userId: number, favorite: Omit<InsertGameFavorite, 'userId'>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add favorite: database not available");
    return;
  }

  try {
    await db.insert(gameFavorites).values({
      ...favorite,
      userId,
    });
  } catch (error) {
    console.error("[Database] Failed to add game favorite:", error);
    throw error;
  }
}

export async function removeGameFavorite(userId: number, gameId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot remove favorite: database not available");
    return;
  }

  try {
    await db.delete(gameFavorites).where(
      and(eq(gameFavorites.userId, userId), eq(gameFavorites.gameId, gameId))
    );
  } catch (error) {
    console.error("[Database] Failed to remove game favorite:", error);
    throw error;
  }
}

export async function getUserGameFavorites(userId: number): Promise<GameFavorite[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get favorites: database not available");
    return [];
  }

  try {
    const result = await db.select().from(gameFavorites).where(eq(gameFavorites.userId, userId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get game favorites:", error);
    return [];
  }
}

export async function isGameFavorited(userId: number, gameId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    const result = await db.select().from(gameFavorites).where(
      and(eq(gameFavorites.userId, userId), eq(gameFavorites.gameId, gameId))
    ).limit(1);
    return result.length > 0;
  } catch (error) {
    console.error("[Database] Failed to check game favorite:", error);
    return false;
  }
}

// Funcoes de Favoritos de Animes
export async function addAnimeFavorite(userId: number, favorite: Omit<InsertAnimeFavorite, 'userId'>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add favorite: database not available");
    return;
  }

  try {
    await db.insert(animeFavorites).values({
      ...favorite,
      userId,
    });
  } catch (error) {
    console.error("[Database] Failed to add anime favorite:", error);
    throw error;
  }
}

export async function removeAnimeFavorite(userId: number, animeId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot remove favorite: database not available");
    return;
  }

  try {
    await db.delete(animeFavorites).where(
      and(eq(animeFavorites.userId, userId), eq(animeFavorites.animeId, animeId))
    );
  } catch (error) {
    console.error("[Database] Failed to remove anime favorite:", error);
    throw error;
  }
}

export async function getUserAnimeFavorites(userId: number): Promise<AnimeFavorite[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get favorites: database not available");
    return [];
  }

  try {
    const result = await db.select().from(animeFavorites).where(eq(animeFavorites.userId, userId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get anime favorites:", error);
    return [];
  }
}

export async function isAnimeFavorited(userId: number, animeId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    const result = await db.select().from(animeFavorites).where(
      and(eq(animeFavorites.userId, userId), eq(animeFavorites.animeId, animeId))
    ).limit(1);
    return result.length > 0;
  } catch (error) {
    console.error("[Database] Failed to check anime favorite:", error);
    return false;
  }
}
