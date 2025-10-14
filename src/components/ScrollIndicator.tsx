import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export const ScrollIndicator = () => {
  const [show, setShow] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Mostrar indicador após 5 segundos
    const showTimer = setTimeout(() => {
      if (!hasScrolled) {
        setShow(true);
      }
    }, 5000);

    // Monitorar scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
        setShow(false);
      }
    };

    // Monitorar interações do usuário
    const handleInteraction = () => {
      setHasScrolled(true);
      setShow(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleInteraction);
    window.addEventListener("touchmove", handleInteraction);

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
    };
  }, [hasScrolled]);

  if (!show) return null;

  return (
    <div className="fixed bottom-32 md:bottom-24 left-1/2 -translate-x-1/2 z-40 animate-bounce-slow">
      <div className="flex flex-col items-center gap-2">
        <div className="hidden sm:block text-muted-foreground text-sm font-medium animate-pulse">
          Role para baixo
        </div>
        <div className="relative">
          {/* Círculo pulsante de fundo */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />

          {/* Botão principal */}
          <button
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight * 0.8,
                behavior: "smooth",
              });
              setShow(false);
              setHasScrolled(true);
            }}
            className="relative w-12 h-12 rounded-full bg-gradient-eclipse border-2 border-primary/30 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
            aria-label="Rolar para baixo"
          >
            <ChevronDown className="w-6 h-6 text-foreground group-hover:text-primary transition-colors animate-bounce-gentle" />
          </button>
        </div>
      </div>
    </div>
  );
};
