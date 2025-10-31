import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function SteamWidget() {
  const { data: steamDeals, isLoading } = trpc.games.steamDeals.useQuery({
    pageNumber: 0,
    pageSize: 3, // Mostrar apenas 3 jogos no widget
  });

  if (isLoading) {
    return (
      <div className="fixed top-24 right-4 w-80 border border-blue-400/30 bg-card/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground font-mono">Carregando...</p>
      </div>
    );
  }

  if (!steamDeals || steamDeals.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-24 right-4 w-80 border border-blue-400/30 bg-card/50 p-4 rounded-lg shadow-lg shadow-blue-400/10 z-40 hidden lg:block">
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-blue-400/20">
        <h3 className="text-sm font-bold text-blue-400 font-mono uppercase">
          🎮 STEAM DEALS
        </h3>
        <p className="text-xs text-muted-foreground font-mono mt-1">
          Melhores ofertas agora
        </p>
      </div>

      {/* Games List */}
      <div className="space-y-3 mb-4">
        {steamDeals.slice(0, 3).map((deal: any) => (
          <div
            key={deal.dealID}
            className="p-2 border border-blue-400/20 bg-background/50 hover:border-blue-400/40 transition-colors"
          >
            <h4 className="text-xs font-bold text-accent line-clamp-1 mb-1">
              {deal.title}
            </h4>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                ${parseFloat(deal.salePrice).toFixed(2)}
              </span>
              <span className="text-xs font-bold text-green-400">
                -{Math.round(deal.savings)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link href="/steam">
        <Button
          size="sm"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 font-mono text-xs font-bold"
        >
          VER TODAS
          <ChevronRight size={14} className="ml-1" />
        </Button>
      </Link>
    </div>
  );
}
