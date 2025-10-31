import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-accent/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="text-2xl font-bold text-accent neon-glow">
            ⚡ TINKERLABS
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-foreground hover:text-accent transition-colors text-sm font-poppins font-bold">
            HOME
          </Link>
          <Link href="/deals" className="text-foreground hover:text-accent transition-colors text-sm font-poppins font-bold">
            DEALS
          </Link>
          <Link href="/steam" className="text-foreground hover:text-accent transition-colors text-sm font-poppins font-bold">
            STEAM
          </Link>
          <Link href="/releases" className="text-foreground hover:text-accent transition-colors text-sm font-poppins font-bold">
            LANCAMENTOS
          </Link>
          <Link href="/anime" className="text-foreground hover:text-accent transition-colors text-sm font-poppins font-bold">
            ANIMES
          </Link>
          <Link href="/news" className="text-foreground hover:text-accent transition-colors text-sm font-poppins font-bold">
            NOTICIAS
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground font-mono">
                {user?.name || "User"}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => logout()}
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                LOGOUT
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:opacity-90"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              LOGIN
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-accent"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-b border-accent/30 p-4 space-y-4">
          <Link href="/" className="block text-foreground hover:text-accent transition-colors text-sm font-poppins font-bold">
            HOME
          </Link>
          <Link href="/deals" className="block text-foreground hover:text-accent transition-colors text-sm font-poppins font-bold">
            DEALS
          </Link>
          <Link href="/steam" className="block text-foreground hover:text-accent transition-colors text-sm font-poppins font-bold">
            STEAM
          </Link>
          <Link href="/releases" className="block text-foreground hover:text-accent transition-colors text-sm font-poppins font-bold">
            LANCAMENTOS
          </Link>
          <Link href="/anime" className="block text-foreground hover:text-accent transition-colors text-sm font-poppins font-bold">
            ANIMES
          </Link>
          <Link href="/news" className="block text-foreground hover:text-accent transition-colors text-sm font-poppins font-bold">
            NOTICIAS
          </Link>
          <div className="pt-4 border-t border-accent/30 space-y-2">
            {isAuthenticated ? (
              <>
                <span className="block text-sm text-muted-foreground font-mono">
                  {user?.name || "User"}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => logout()}
                  className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  LOGOUT
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                className="w-full bg-accent text-accent-foreground hover:opacity-90"
                onClick={() => (window.location.href = getLoginUrl())}
              >
                LOGIN
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
