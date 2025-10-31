import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, Filter, ExternalLink, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Deals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [minDiscount, setMinDiscount] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedGame, setSelectedGame] = useState<any>(null);

  // Buscar deals da CheapShark
  const { data: allDeals, isLoading: dealsLoading } = trpc.games.searchDeals.useQuery({
    title: searchQuery || undefined,
    minDiscount: 0, // Buscar todos, filtrar no cliente
    pageNumber,
    pageSize: 20,
    sortBy: "Savings",
    desc: true,
  });

  // Filtrar deals no cliente pelo desconto mínimo
  const deals = allDeals?.filter((deal: any) => {
    const discount = Math.round(parseFloat(deal.savings));
    return discount >= minDiscount;
  }) || [];

  const platforms = [
    { id: "all", name: "Todas as Plataformas" },
    { id: "pc", name: "PC" },
    { id: "ps5", name: "PlayStation 5" },
    { id: "xbox", name: "Xbox Series X" },
    { id: "switch", name: "Nintendo Switch" },
  ];

  const genres = [
    { id: "all", name: "Todos os Gêneros" },
    { id: "action", name: "Ação" },
    { id: "rpg", name: "RPG" },
    { id: "strategy", name: "Estratégia" },
    { id: "indie", name: "Indie" },
    { id: "sports", name: "Esportes" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-accent mb-4 neon-glow">
              DEALS
            </h1>
            <p className="text-muted-foreground font-mono text-lg">
              &gt; Encontre as melhores promoções de jogos, é possível que o filtro não funcione as vezes!
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent" size={20} />
              <Input
                type="text"
                placeholder="Buscar jogos..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPageNumber(0);
                }}
                className="pl-10 bg-card border-accent/30 text-foreground placeholder:text-muted-foreground focus:border-accent"
              />
            </div>
            <Button
              className="bg-accent text-accent-foreground hover:opacity-90 font-mono font-bold"
            >
              <Filter size={20} className="mr-2" />
              FILTROS
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 border border-accent/20 bg-card/50">
            {/* Min Discount Filter */}
            <div>
              <label className="block text-sm font-mono text-accent mb-2">
                DESCONTO MÍNIMO: {minDiscount}%
              </label>
              <input
                type="range"
                min="0"
                max="90"
                value={minDiscount}
                onChange={(e) => {
                  setMinDiscount(Number(e.target.value));
                  setPageNumber(0);
                }}
                className="w-full accent-accent"
              />
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-sm font-mono text-accent mb-2">
                PLATAFORMA
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => {
                  setSelectedPlatform(e.target.value);
                  setPageNumber(0);
                }}
                className="w-full px-3 py-2 bg-background border border-accent/30 text-foreground font-mono text-sm focus:border-accent focus:outline-none"
              >
                {platforms.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-mono text-accent mb-2">
                GÊNERO
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => {
                  setSelectedGenre(e.target.value);
                  setPageNumber(0);
                }}
                className="w-full px-3 py-2 bg-background border border-accent/30 text-foreground font-mono text-sm focus:border-accent focus:outline-none"
              >
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealsLoading ? (
              <div className="col-span-full text-center text-muted-foreground font-mono py-12">
                <p>Carregando jogos em promoção...</p>
              </div>
            ) : deals && deals.length > 0 ? (
              deals.map((deal: any) => (
                <div
                  key={deal.dealID}
                  className="border border-accent/30 bg-card/50 hover:border-accent/60 transition-all hover:shadow-lg hover:shadow-accent/20 overflow-hidden group cursor-pointer"
                >
                  {/* Game Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center overflow-hidden">
                    {deal.thumb ? (
                      <img
                        src={deal.thumb}
                        alt={deal.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    ) : (
                      <div className="text-accent/40 text-4xl">🎮</div>
                    )}
                  </div>

                  {/* Game Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-bold text-accent group-hover:text-accent/80 transition-colors line-clamp-2">
                      {deal.title}
                    </h3>

                    {/* Store Badge */}
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs px-2 py-1 border border-accent/30 text-muted-foreground font-mono">
                        {deal.storeName || "Store"}
                      </span>
                    </div>

                    {/* Price Info */}
                    <div className="pt-2 border-t border-accent/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground font-mono text-sm">Preço:</span>
                        <span className="text-accent font-bold">${parseFloat(deal.salePrice).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-mono text-sm">Desconto:</span>
                        <span className="text-green-400 font-bold text-lg">-{Math.round(deal.savings)}%</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className="w-full bg-accent text-accent-foreground hover:opacity-90 font-mono font-bold mt-4"
                      onClick={() => setSelectedGame(deal)}
                    >
                      VER DETALHES
                      <ExternalLink size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground font-mono py-12">
                <p>{minDiscount > 0 ? `Nenhum jogo com desconto de ${minDiscount}% ou mais.` : "Nenhum jogo encontrado."}</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {deals && deals.length > 0 && (
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
                disabled={deals.length < 20}
              >
                PROXIMA PAGINA
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedGame && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedGame(null)}
        >
          <div
            className="bg-card border-2 border-accent rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedGame(null)}
              className="absolute top-4 right-4 text-accent hover:text-accent/70 transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Image */}
            {selectedGame.thumb && (
              <div className="w-full h-96 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
                <img
                  src={selectedGame.thumb}
                  alt={selectedGame.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-4">
              <h2 className="text-3xl font-bold text-accent font-fredoka">
                {selectedGame.title}
              </h2>

              {/* Pricing */}
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-poppins">Preço Original:</span>
                  <span className="line-through text-muted-foreground font-poppins">
                    ${parseFloat(selectedGame.normalPrice).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-accent font-poppins">Preço em Promoção:</span>
                  <span className="text-2xl font-bold text-accent font-poppins">
                    ${parseFloat(selectedGame.salePrice).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-400 font-poppins">Economia:</span>
                  <span className="text-lg font-bold text-green-400 font-poppins">
                    -{Math.round(selectedGame.savings)}%
                  </span>
                </div>
              </div>

              {/* Store & Rating */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground font-poppins text-sm mb-1">Loja</p>
                  <p className="font-bold text-accent font-poppins">
                    {selectedGame.storeName}
                  </p>
                </div>
                {selectedGame.dealRating && (
                  <div>
                    <p className="text-muted-foreground font-poppins text-sm mb-1">Avaliação</p>
                    <p className="text-accent font-bold font-poppins">
                      ⭐ {parseFloat(selectedGame.dealRating).toFixed(1)}/10
                    </p>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Button
                className="w-full bg-accent text-accent-foreground hover:opacity-90 font-poppins font-bold mt-6"
                onClick={() => {
                  window.open(
                    `https://www.cheapshark.com/redirect?dealID=${selectedGame.dealID}`,
                    "_blank"
                  );
                }}
              >
                COMPRAR AGORA
                <ExternalLink size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
