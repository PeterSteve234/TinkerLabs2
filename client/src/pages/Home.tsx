import Header from "@/components/Header";
import SteamWidget from "@/components/SteamWidget";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <SteamWidget />

      {/* Hero Section - Inspired by Tesla */}
      <section className="relative h-screen w-full overflow-hidden pt-16">
        {/* Background with gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          {/* Main Title */}
          <div className="mb-8 space-y-4 max-w-4xl">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-accent neon-glow">
              TINKERLABS
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-mono">
              &gt; GAME DEAL AGGREGATOR
            </p>
            <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
              Encontre as melhores promoções de jogos em múltiplas plataformas. 
              Descontos incríveis, filtros inteligentes, ofertas em tempo real.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/deals">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:opacity-90 text-base font-mono font-bold px-8"
              >
                <Zap className="mr-2" size={20} />
                EXPLORAR DEALS
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 text-base font-mono font-bold px-8"
            >
              SAIBA MAIS
              <ChevronRight className="ml-2" size={20} />
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="text-accent text-sm font-mono">SCROLL</div>
            <div className="text-accent mt-2">↓</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 bg-card/30 border-t border-accent/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-accent text-center mb-16 neon-glow">
            RECURSOS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border border-accent/30 bg-background/50 hover:border-accent/60 transition-all hover:shadow-lg hover:shadow-accent/20">
              <div className="text-3xl mb-4 text-accent">⚡</div>
              <h3 className="text-xl font-bold text-accent mb-3">BUSCA RÁPIDA</h3>
              <p className="text-muted-foreground font-mono text-sm">
                Encontre jogos em promoção de múltiplas lojas em segundos.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border border-accent/30 bg-background/50 hover:border-accent/60 transition-all hover:shadow-lg hover:shadow-accent/20">
              <div className="text-3xl mb-4 text-accent">🎮</div>
              <h3 className="text-xl font-bold text-accent mb-3">FILTROS INTELIGENTES</h3>
              <p className="text-muted-foreground font-mono text-sm">
                Filtre por desconto, plataforma, gênero e muito mais.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border border-accent/30 bg-background/50 hover:border-accent/60 transition-all hover:shadow-lg hover:shadow-accent/20">
              <div className="text-3xl mb-4 text-accent">📊</div>
              <h3 className="text-xl font-bold text-accent mb-3">OFERTAS EM TEMPO REAL</h3>
              <p className="text-muted-foreground font-mono text-sm">
                Atualizações constantes das melhores ofertas do mercado.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/deals">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:opacity-90 text-base font-mono font-bold"
              >
                COMEÇAR AGORA
                <ChevronRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/20 bg-background/50 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-muted-foreground text-sm font-mono">
            <p>&copy; 2025 TinkerLabs. Todos os direitos reservados.</p>
            <p className="mt-2 text-xs">
              Dados de promoções fornecidos por <a href="https://www.cheapshark.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">CheapShark</a> e <a href="https://rawg.io" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">RAWG</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
