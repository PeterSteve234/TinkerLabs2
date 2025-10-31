import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Releases() {
  const [sortBy, setSortBy] = useState<"released" | "added">("released");

  // Buscar últimos lançamentos da RAWG API
  const { data: releases, isLoading } = trpc.games.searchRAWG.useQuery({
    search: "",
    limit: 20,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Page Title */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-accent" size={32} />
              <h1 className="text-5xl md:text-6xl font-bold text-accent">
                ULTIMOS LANCAMENTOS
              </h1>
            </div>
            <p className="text-muted-foreground font-poppins text-lg">
              &gt; Descubra os games mais recentes do mercado
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-8">
            <Button
              onClick={() => setSortBy("released")}
              className={`font-poppins font-bold ${
                sortBy === "released"
                  ? "bg-accent text-accent-foreground hover:opacity-90"
                  : "border-accent text-accent hover:bg-accent/10 border"
              }`}
            >
              LANCADOS RECENTEMENTE
            </Button>
            <Button
              onClick={() => setSortBy("added")}
              className={`font-poppins font-bold ${
                sortBy === "added"
                  ? "bg-accent text-accent-foreground hover:opacity-90"
                  : "border-accent text-accent hover:bg-accent/10 border"
              }`}
            >
              ADICIONADOS AO CATALOGO
            </Button>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center text-muted-foreground font-poppins py-12">
                <p>Carregando últimos lançamentos...</p>
              </div>
            ) : releases && releases.length > 0 ? (
              releases.map((game: any) => (
                <div
                  key={game.id}
                  className="border-2 border-accent/40 bg-card/60 hover:border-accent hover:shadow-lg hover:shadow-accent/30 transition-all overflow-hidden group rounded-xl"
                >
                  {/* Game Image */}
                  {game.background_image && (
                    <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                  )}

                  {/* Game Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-bold text-accent group-hover:text-accent/80 transition-colors line-clamp-2 font-fredoka">
                      {game.name}
                    </h3>

                    {/* Release Date */}
                    {game.released && (
                      <div className="text-sm text-muted-foreground font-poppins">
                        <p>Lançado: {formatDate(game.released)}</p>
                      </div>
                    )}

                    {/* Platforms */}
                    {game.platforms && game.platforms.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {game.platforms.slice(0, 3).map((p: any) => (
                          <span
                            key={p.platform.id}
                            className="text-xs px-2 py-1 border border-accent/30 text-accent bg-accent/5 rounded font-poppins"
                          >
                            {p.platform.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Genres */}
                    {game.genres && game.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {game.genres.slice(0, 2).map((g: any) => (
                          <span
                            key={g.id}
                            className="text-xs px-2 py-1 bg-accent/20 text-accent rounded font-poppins"
                          >
                            {g.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Rating */}
                    {game.rating && (
                      <div className="text-sm font-bold text-accent font-poppins">
                        ⭐ {game.rating.toFixed(1)}/5
                      </div>
                    )}

                    {/* CTA Button */}
                    <Button className="w-full bg-accent text-accent-foreground hover:opacity-90 font-poppins font-bold">
                      VER DETALHES
                      <ExternalLink size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground font-poppins py-12">
                <p>Nenhum jogo encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
