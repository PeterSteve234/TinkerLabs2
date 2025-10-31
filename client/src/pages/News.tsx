import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ExternalLink, Calendar } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function News() {
  const [status, setStatus] = useState<"active" | "expired">("active");

  // Buscar notícias da GamerPower API
  const { data: news, isLoading } = trpc.games.getNews.useQuery({
    limit: 20,
    status,
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
            <h1 className="text-5xl md:text-6xl font-bold text-accent mb-4 neon-glow">
              NOTICIAS
            </h1>
            <p className="text-muted-foreground font-mono text-lg">
              &gt; Fique atualizado com as últimas notícias e giveaways de games
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-8">
            <Button
              onClick={() => setStatus("active")}
              className={`font-mono font-bold ${
                status === "active"
                  ? "bg-accent text-accent-foreground hover:opacity-90"
                  : "border-accent text-accent hover:bg-accent/10 border"
              }`}
            >
              ATIVAS
            </Button>
            <Button
              onClick={() => setStatus("expired")}
              className={`font-mono font-bold ${
                status === "expired"
                  ? "bg-accent text-accent-foreground hover:opacity-90"
                  : "border-accent text-accent hover:bg-accent/10 border"
              }`}
            >
              EXPIRADAS
            </Button>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center text-muted-foreground font-mono py-12">
                <p>Carregando notícias...</p>
              </div>
            ) : news && news.length > 0 ? (
              news.map((item: any) => (
                <div
                  key={item.id}
                  className="border border-accent/30 bg-card/50 hover:border-accent/60 transition-all hover:shadow-lg hover:shadow-accent/20 overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  {item.image && (
                    <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-accent mb-2 line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-2 mb-4 text-xs text-muted-foreground font-mono">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>
                          Publicado: {formatDate(item.published_date)}
                        </span>
                      </div>
                      {item.end_date && (
                        <div className="flex items-center gap-2">
                          <span>Expira: {formatDate(item.end_date)}</span>
                        </div>
                      )}
                    </div>

                    {/* Type Badge */}
                    <div className="mb-4">
                      <span className="text-xs px-2 py-1 border border-accent/30 text-accent font-mono bg-accent/5">
                        {item.type || "NEWS"}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className="w-full bg-accent text-accent-foreground hover:opacity-90 font-mono font-bold"
                      onClick={() => window.open(item.open_giveaway_url, "_blank")}
                    >
                      VER DETALHES
                      <ExternalLink size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground font-mono py-12">
                <p>Nenhuma notícia encontrada.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
