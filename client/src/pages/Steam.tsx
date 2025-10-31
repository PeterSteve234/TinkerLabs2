import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Steam() {
  const [pageNumber, setPageNumber] = useState(0);

  // Buscar deals específicos da Steam
  const { data: steamDeals, isLoading: dealsLoading } = trpc.games.steamDeals.useQuery({
    pageNumber,
    pageSize: 20,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-accent mb-4 neon-glow">
              STEAM DEALS
            </h1>
            <p className="text-muted-foreground font-mono text-lg">
              &gt; As melhores promoções da plataforma Steam
            </p>
          </div>

          {/* Steam Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealsLoading ? (
              <div className="col-span-full text-center text-muted-foreground font-mono py-12">
                <p>Carregando promoções da Steam...</p>
              </div>
            ) : steamDeals && steamDeals.length > 0 ? (
              steamDeals.map((deal: any) => (
                <div
                  key={deal.dealID}
                  className="border border-accent/30 bg-card/50 hover:border-accent/60 transition-all hover:shadow-lg hover:shadow-accent/20 overflow-hidden group cursor-pointer"
                >
                  {/* Game Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-blue-600/20 to-blue-600/5 flex items-center justify-center overflow-hidden">
                    {deal.thumb ? (
                      <img
                        src={deal.thumb}
                        alt={deal.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    ) : (
                      <div className="text-blue-400/40 text-4xl">🎮</div>
                    )}
                  </div>

                  {/* Game Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-bold text-accent group-hover:text-accent/80 transition-colors line-clamp-2">
                      {deal.title}
                    </h3>

                    {/* Platform Badge */}
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs px-2 py-1 border border-blue-400/30 text-blue-400 font-mono bg-blue-400/5">
                        STEAM
                      </span>
                    </div>

                    {/* Price Info */}
                    <div className="pt-2 border-t border-accent/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground font-mono text-sm">Preço Original:</span>
                        <span className="text-muted-foreground line-through">
                          ${parseFloat(deal.normalPrice).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground font-mono text-sm">Preço Atual:</span>
                        <span className="text-accent font-bold">${parseFloat(deal.salePrice).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-mono text-sm">Desconto:</span>
                        <span className="text-green-400 font-bold text-lg">-{Math.round(deal.savings)}%</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 font-mono font-bold mt-4"
                      onClick={() => window.open(`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`, '_blank')}
                    >
                      VER NA STEAM
                      <ExternalLink size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground font-mono py-12">
                <p>Nenhuma promoção encontrada na Steam no momento.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {steamDeals && steamDeals.length > 0 && (
            <div className="mt-12 flex justify-center gap-4">
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10"
                onClick={() => setPageNumber(Math.max(0, pageNumber - 1))}
                disabled={pageNumber === 0}
              >
                PAGINA ANTERIOR
              </Button>
              <span className="text-muted-foreground font-mono flex items-center">
                Página {pageNumber + 1}
              </span>
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10"
                onClick={() => setPageNumber(pageNumber + 1)}
                disabled={steamDeals.length < 20}
              >
                PROXIMA PAGINA
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
