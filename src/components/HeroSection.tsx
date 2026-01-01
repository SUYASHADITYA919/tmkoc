import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCharacters = () => {
    document.getElementById("characters")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Background Layer - moves slowest */}
      <div
        className="absolute inset-0 parallax-layer"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <img
          src={heroBg}
          alt="Gokuldham Society"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Floating decorative elements - Layer 2 */}
      <div
        className="absolute inset-0 pointer-events-none parallax-layer"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl floating" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl floating-delayed" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-secondary/20 rounded-full blur-xl floating-slow" />
      </div>

      {/* Middle decorative layer - Layer 3 */}
      <div
        className="absolute inset-0 pointer-events-none parallax-layer"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute top-1/3 left-20 text-6xl floating">🎬</div>
        <div className="absolute top-1/4 right-32 text-5xl floating-delayed">⭐</div>
        <div className="absolute bottom-1/3 right-20 text-6xl floating-slow">🎭</div>
      </div>

      {/* Content Layer - moves fastest */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-4 parallax-layer"
        style={{ transform: `translateY(${scrollY * 0.7}px)` }}
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6 animate-slide-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Welcome to Gokuldham Society</span>
          </div>

          {/* Title */}
          <h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-gradient">TMKOC</span>
            <br />
            <span className="text-foreground">Character Hunt</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Discover your favorite characters from Taarak Mehta Ka Ooltah Chashmah 
            and build your ultimate watchlist!
          </p>

          {/* CTA Button */}
          <Button 
            variant="hero" 
            size="xl"
            onClick={scrollToCharacters}
            className="animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Sparkles className="w-5 h-5" />
            Start Collecting
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={scrollToCharacters}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
