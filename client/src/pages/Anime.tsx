import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ExternalLink, Sparkles, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface AnimeDetail {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  synopsis: string;
  score: number;
  genres: Array<{
    name: string;
  }>;
  status: string;
  aired: {
    from: string;
  };
  url: string;
  episodes: number;
  type: string;
}

export default function Anime() {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetail | null>(null);

  // Buscar animes usando tRPC
  const { data: animes, isLoading } = trpc.games.getAnimes.useQuery({
    genre: selectedGenre || undefined,
    status: selectedStatus || undefined,
    limit: 20,
  });

  const genres = [
    "Acao",
    "Aventura",
    "Comedia",
    "Drama",
    "Fantasia",
    "Horror",
    "Psicologico",
    "Romance",
    "Ficcao",
    "Sobrenatural",
  ];

  const statuses = ["Airing", "Complete", "Upcoming"];

  const formatDate = (dateString: string) => {
    if (!dateString) return "Data desconhecida";
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
              <h1 className="text-5xl md:text-6xl font-bold text-accent font-fredoka">
                ANIMES
              </h1>
            </div>
            <p className="text-muted-foreground font-poppins text-lg">
              &gt; Descubra os melhores animes do momento
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div>
              <label className="block text-sm font-bold text-accent mb-2 font-poppins">
                GENERO
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setSelectedGenre("")}
                  className={`font-poppins font-bold ${
                    selectedGenre === ""
                      ? "bg-accent text-accent-foreground"
                      : "border-accent text-accent hover:bg-accent/10 border"
                  }`}
                >
                  TODOS
                </Button>
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`font-poppins font-bold ${
                      selectedGenre === genre
                        ? "bg-accent text-accent-foreground"
                        : "border-accent text-accent hover:bg-accent/10 border"
                    }`}
                  >
                    {genre.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-accent mb-2 font-poppins">
                STATUS
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setSelectedStatus("")}
                  className={`font-poppins font-bold ${
                    selectedStatus === ""
                      ? "bg-accent text-accent-foreground"
                      : "border-accent text-accent hover:bg-accent/10 border"
                  }`}
                >
                  TODOS
                </Button>
                {statuses.map((s) => (
                  <Button
                    key={s}
                    onClick={() => setSelectedStatus(s)}
                    className={`font-poppins font-bold ${
                      selectedStatus === s
                        ? "bg-accent text-accent-foreground"
                        : "border-accent text-accent hover:bg-accent/10 border"
                    }`}
                  >
                    {s.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Animes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center text-muted-foreground font-poppins py-12">
                <p>Carregando animes...</p>
              </div>
            ) : animes && animes.length > 0 ? (
              animes.map((anime: AnimeDetail) => (
                <div
                  key={anime.mal_id}
                  className="border-2 border-accent/40 bg-card/60 hover:border-accent hover:shadow-lg hover:shadow-accent/30 transition-all overflow-hidden group rounded-xl cursor-pointer"
                  onClick={() => setSelectedAnime(anime)}
                >
                  {/* Anime Image */}
                  {anime.images?.jpg?.image_url && (
                    <div className="w-full h-64 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
                      <img
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                  )}

                  {/* Anime Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-bold text-accent group-hover:text-accent/80 transition-colors line-clamp-2 font-fredoka">
                      {anime.title}
                    </h3>

                    {/* Synopsis */}
                    <p className="text-sm text-muted-foreground line-clamp-2 font-poppins">
                      {anime.synopsis || "Sem sinopse disponível"}
                    </p>

                    {/* Genres */}
                    {anime.genres && anime.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {anime.genres.slice(0, 3).map((g) => (
                          <span
                            key={g.name}
                            className="text-xs px-2 py-1 bg-accent/20 text-accent rounded font-poppins"
                          >
                            {g.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Status & Score */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2 py-1 border border-accent/30 text-accent bg-accent/5 rounded font-poppins">
                        {anime.status}
                      </span>
                      {anime.score && (
                        <div className="text-sm font-bold text-accent font-poppins">
                          ⭐ {anime.score.toFixed(1)}/10
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className="w-full bg-accent text-accent-foreground hover:opacity-90 font-poppins font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAnime(anime);
                      }}
                    >
                      VER DETALHES
                      <ExternalLink size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground font-poppins py-12">
                <p>Nenhum anime encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedAnime && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAnime(null)}
        >
          <div
            className="bg-card border-2 border-accent rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedAnime(null)}
              className="absolute top-4 right-4 text-accent hover:text-accent/70 transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Image */}
            {selectedAnime.images?.jpg?.image_url && (
              <div className="w-full h-96 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
                <img
                  src={selectedAnime.images.jpg.image_url}
                  alt={selectedAnime.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-4">
              <h2 className="text-3xl font-bold text-accent font-fredoka">
                {selectedAnime.title}
              </h2>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground font-poppins">Status</p>
                  <p className="text-accent font-bold font-poppins">
                    {selectedAnime.status}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground font-poppins">Tipo</p>
                  <p className="text-accent font-bold font-poppins">
                    {selectedAnime.type || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground font-poppins">Episódios</p>
                  <p className="text-accent font-bold font-poppins">
                    {selectedAnime.episodes || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground font-poppins">Avaliação</p>
                  <p className="text-accent font-bold font-poppins">
                    ⭐ {selectedAnime.score.toFixed(1)}/10
                  </p>
                </div>
              </div>

              {/* Genres */}
              {selectedAnime.genres && selectedAnime.genres.length > 0 && (
                <div>
                  <p className="text-muted-foreground font-poppins text-sm mb-2">
                    Gêneros
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAnime.genres.map((g) => (
                      <span
                        key={g.name}
                        className="text-xs px-3 py-1 bg-accent/20 text-accent rounded-full font-poppins"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Synopsis */}
              <div>
                <p className="text-muted-foreground font-poppins text-sm mb-2">
                  Sinopse
                </p>
                <p className="text-foreground font-poppins text-sm leading-relaxed">
                  {selectedAnime.synopsis || "Sem sinopse disponível"}
                </p>
              </div>

              {/* Air Date */}
              {selectedAnime.aired?.from && (
                <div>
                  <p className="text-muted-foreground font-poppins text-sm mb-2">
                    Data de Lançamento
                  </p>
                  <p className="text-accent font-bold font-poppins">
                    {formatDate(selectedAnime.aired.from)}
                  </p>
                </div>
              )}

              {/* CTA Button */}
              <Button
                className="w-full bg-accent text-accent-foreground hover:opacity-90 font-poppins font-bold mt-6"
                onClick={() => window.open(selectedAnime.url, "_blank")}
              >
                VER NO MYANIMELIST
                <ExternalLink size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
