import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { characters, Character } from "@/data/characters";
import HeroSection from "@/components/HeroSection";
import CharacterCard from "@/components/CharacterCard";
import WatchlistSidebar from "@/components/WatchlistSidebar";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const watchlistCharacters = characters.filter((c) => watchlistIds.includes(c.id));

  const toggleWatchlist = (id: string) => {
    const character = characters.find((c) => c.id === id);
    if (!character) return;

    if (watchlistIds.includes(id)) {
      setWatchlistIds((prev) => prev.filter((wId) => wId !== id));
      toast({
        title: "Removed from watchlist",
        description: `${character.nickname} has been removed from your watchlist.`,
      });
    } else {
      setWatchlistIds((prev) => [...prev, id]);
      toast({
        title: "Added to watchlist! 🎉",
        description: `${character.nickname} is now in your watchlist.`,
      });
    }
  };

  const clearWatchlist = () => {
    setWatchlistIds([]);
    toast({
      title: "Watchlist cleared",
      description: "All characters have been removed from your watchlist.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-display text-xl font-bold text-gradient">TMKOC Hunt</span>
          </div>

          <Button
            variant="outline"
            className="relative"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Heart className="w-4 h-4 mr-2" />
            Watchlist
            {watchlistIds.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {watchlistIds.length}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Characters Grid */}
      <section id="characters" className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Meet the <span className="text-gradient">Characters</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the beloved residents of Gokuldham Society and add your favorites to your watchlist!
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character, index) => (
              <CharacterCard
                key={character.id}
                character={character}
                isInWatchlist={watchlistIds.includes(character.id)}
                onToggleWatchlist={toggleWatchlist}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Made with <Heart className="w-4 h-4 inline text-primary fill-current" /> for TMKOC fans
          </p>
        </div>
      </footer>

      {/* Watchlist Sidebar */}
      <WatchlistSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        watchlist={watchlistCharacters}
        onRemove={toggleWatchlist}
        onClear={clearWatchlist}
      />
    </div>
  );
};

export default Index;
