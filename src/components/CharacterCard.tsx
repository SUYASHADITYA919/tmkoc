import { Character } from "@/data/characters";
import { Button } from "@/components/ui/button";
import { Heart, Plus, Check } from "lucide-react";

interface CharacterCardProps {
  character: Character;
  isInWatchlist: boolean;
  onToggleWatchlist: (id: string) => void;
  index: number;
}

const CharacterCard = ({ character, isInWatchlist, onToggleWatchlist, index }: CharacterCardProps) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-card card-glow animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
    >
      {/* Gradient Header */}
      <div className={`h-32 bg-gradient-to-r ${character.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBjeD0iMjAiIGN5PSIyMCIgcj0iNSIvPjwvZz48L3N2Zz4=')] opacity-50" />
        
        {/* Character Initial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-display font-bold text-primary-foreground/30 group-hover:scale-110 transition-transform duration-300">
            {character.nickname.charAt(0)}
          </span>
        </div>

        {/* Heart indicator for watchlist */}
        {isInWatchlist && (
          <div className="absolute top-3 right-3 bg-primary-foreground/20 backdrop-blur-sm rounded-full p-2">
            <Heart className="w-5 h-5 text-primary-foreground fill-current" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
          {character.nickname}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{character.name}</p>
        <p className="text-sm font-medium text-secondary mb-3">{character.role}</p>
        
        {/* Catchphrase */}
        <div className="bg-muted rounded-lg p-3 mb-4">
          <p className="text-sm italic text-muted-foreground">"{character.catchphrase}"</p>
        </div>

        {/* Action Button */}
        <Button
          variant={isInWatchlist ? "outline" : "watchlist"}
          size="sm"
          className="w-full"
          onClick={() => onToggleWatchlist(character.id)}
        >
          {isInWatchlist ? (
            <>
              <Check className="w-4 h-4" />
              In Watchlist
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add to Watchlist
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CharacterCard;
