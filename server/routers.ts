import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { addGameFavorite, removeGameFavorite, getUserGameFavorites, isGameFavorited, addAnimeFavorite, removeAnimeFavorite, getUserAnimeFavorites, isAnimeFavorited } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  games: router({
    // Buscar jogos em promoção da CheapShark
    searchDeals: publicProcedure
      .input(
        z.object({
          title: z.string().optional(),
          minDiscount: z.number().min(0).max(100).default(0),
          pageNumber: z.number().min(0).default(0),
          pageSize: z.number().min(1).max(60).default(20),
          sortBy: z.enum(["DealRating", "Savings", "Price", "Metacritic", "Reviews", "Release", "Store", "Recent"]).default("Savings"),
          desc: z.boolean().default(true),
          storeID: z.string().optional(),
        })
      )
      .query(async ({ input }) => {
        try {
          const params = new URLSearchParams({
            pageNumber: input.pageNumber.toString(),
            pageSize: input.pageSize.toString(),
            sortBy: input.sortBy,
            desc: input.desc ? "1" : "0",
            lowerPrice: "0",
            upperPrice: "60",
          });

          if (input.title) {
            params.append("title", input.title);
          }

          if (input.minDiscount > 0) {
            params.append("onSale", "1");
          }

          if (input.storeID) {
            params.append("storeID", input.storeID);
          }

          const response = await fetch(
            `https://www.cheapshark.com/api/1.0/deals?${params.toString()}`
          );

          if (!response.ok) {
            throw new Error(`CheapShark API error: ${response.statusText}`);
          }

          const deals = await response.json();
          return deals;
        } catch (error) {
          console.error("Error fetching deals:", error);
          throw new Error("Failed to fetch game deals");
        }
      }),

    // Buscar detalhes do jogo na RAWG
    searchRAWG: publicProcedure
      .input(
        z.object({
          search: z.string(),
          limit: z.number().min(1).max(40).default(20),
        })
      )
      .query(async ({ input }) => {
        try {
          const RAWG_API_KEY = process.env.RAWG_API_KEY || "6603586d2b01415b9a433df6b609c458";
          const params = new URLSearchParams({
            key: RAWG_API_KEY,
            search: input.search,
            page_size: input.limit.toString(),
          });

          const response = await fetch(
            `https://api.rawg.io/api/games?${params.toString()}`
          );

          if (!response.ok) {
            throw new Error(`RAWG API error: ${response.statusText}`);
          }

          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching RAWG data:", error);
          throw new Error("Failed to fetch game data");
        }
      }),

    // Buscar promoções específicas da Steam
    steamDeals: publicProcedure
      .input(
        z.object({
          pageNumber: z.number().min(0).default(0),
          pageSize: z.number().min(1).max(60).default(20),
        })
      )
      .query(async ({ input }) => {
        try {
          const params = new URLSearchParams({
            pageNumber: input.pageNumber.toString(),
            pageSize: input.pageSize.toString(),
            storeID: "1", // Steam store ID
            sortBy: "Savings",
            desc: "1",
            onSale: "1",
          });

          const response = await fetch(
            `https://www.cheapshark.com/api/1.0/deals?${params.toString()}`
          );

          if (!response.ok) {
            throw new Error(`CheapShark API error: ${response.statusText}`);
          }

          const deals = await response.json();
          return deals;
        } catch (error) {
          console.error("Error fetching Steam deals:", error);
          throw new Error("Failed to fetch Steam deals");
        }
      }),

    // Buscar noticias de games da GamerPower API
    getNews: publicProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(50).default(10),
          status: z.enum(["active", "expired"]).default("active"),
        })
      )
      .query(async ({ input }) => {
        try {
          const params = new URLSearchParams({
            limit: input.limit.toString(),
            status: input.status,
          });

          const response = await fetch(
            `https://www.gamerpower.com/api/giveaways?${params.toString()}`
          );

          if (!response.ok) {
            throw new Error(`GamerPower API error: ${response.statusText}`);
          }

          const news = await response.json();
          return news;
        } catch (error) {
          console.error("Error fetching news:", error);
          throw new Error("Failed to fetch game news");
        }
      }),

    getAnimes: publicProcedure
      .input(
        z.object({
          genre: z.string().optional(),
          status: z.string().optional(),
          limit: z.number().min(1).max(50).default(20),
        })
      )
      .query(async ({ input }) => {
        try {
          let url = `https://api.jikan.moe/v4/anime?order_by=score&sort=desc&limit=${input.limit}`;

          if (input.genre) {
            const genreMap: { [key: string]: number } = {
              "Acao": 1,
              "Aventura": 2,
              "Comedia": 4,
              "Drama": 8,
              "Fantasia": 10,
              "Horror": 14,
              "Psicologico": 40,
              "Romance": 22,
              "Ficcao": 24,
              "Sobrenatural": 37,
            };
            url += `&genres=${genreMap[input.genre] || 1}`;
          }

          if (input.status) {
            url += `&status=${input.status.toLowerCase()}`;
          }

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Jikan API error: ${response.statusText}`);
          }

          const data = await response.json();
          return data.data || [];
        } catch (error) {
          console.error("Error fetching animes:", error);
          throw new Error("Failed to fetch animes");
        }
      }),

    // Rotas de Favoritos de Jogos
    addGameFavorite: protectedProcedure
      .input(
        z.object({
          gameId: z.string(),
          gameTitle: z.string().optional(),
          gameImage: z.string().optional(),
          gamePrice: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user?.id) throw new Error("Not authenticated");
        await addGameFavorite(ctx.user.id, input);
        return { success: true };
      }),

    removeGameFavorite: protectedProcedure
      .input(z.object({ gameId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user?.id) throw new Error("Not authenticated");
        await removeGameFavorite(ctx.user.id, input.gameId);
        return { success: true };
      }),

    getUserGameFavorites: protectedProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user?.id) throw new Error("Not authenticated");
        return await getUserGameFavorites(ctx.user.id);
      }),

    isGameFavorited: protectedProcedure
      .input(z.object({ gameId: z.string() }))
      .query(async ({ ctx, input }) => {
        if (!ctx.user?.id) return false;
        return await isGameFavorited(ctx.user.id, input.gameId);
      }),

    // Rotas de Favoritos de Animes
    addAnimeFavorite: protectedProcedure
      .input(
        z.object({
          animeId: z.number(),
          animeTitle: z.string().optional(),
          animeImage: z.string().optional(),
          animeScore: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user?.id) throw new Error("Not authenticated");
        await addAnimeFavorite(ctx.user.id, input);
        return { success: true };
      }),

    removeAnimeFavorite: protectedProcedure
      .input(z.object({ animeId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user?.id) throw new Error("Not authenticated");
        await removeAnimeFavorite(ctx.user.id, input.animeId);
        return { success: true };
      }),

    getUserAnimeFavorites: protectedProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user?.id) throw new Error("Not authenticated");
        return await getUserAnimeFavorites(ctx.user.id);
      }),

    isAnimeFavorited: protectedProcedure
      .input(z.object({ animeId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (!ctx.user?.id) return false;
        return await isAnimeFavorited(ctx.user.id, input.animeId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
