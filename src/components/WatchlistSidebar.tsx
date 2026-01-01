import { Character } from "@/data/characters";
import { Button } from "@/components/ui/button";
import { X, Heart, Trash2 } from "lucide-react";

interface WatchlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: Character[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const WatchlistSidebar = ({ isOpen, onClose, watchlist, onRemove, onClear }: WatchlistSidebarProps) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">My Watchlist</h2>
              <p className="text-sm text-muted-foreground">{watchlist.length} characters</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-[calc(100%-180px)]">
          {watchlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-4 bg-muted rounded-full mb-4">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                No characters yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Start adding your favorite TMKOC characters to your watchlist!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {watchlist.map((character, index) => (
                <div
                  key={character.id}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl group hover:bg-muted transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${character.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-lg font-display font-bold text-primary-foreground">
                      {character.nickname.charAt(0)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-foreground truncate">
                      {character.nickname}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">{character.role}</p>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onRemove(character.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {watchlist.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-card">
            <Button
              variant="outline"
              className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
              onClick={onClear}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Watchlist
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default WatchlistSidebar;
