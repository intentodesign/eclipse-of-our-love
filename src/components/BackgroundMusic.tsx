import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";
import musicFile from "@/assets/the-vow.mp3";

export const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasTriedAutoplay = useRef(false);

  const FADE_DURATION = 2000; // 2 segundos para fade in/out
  const FADE_STEPS = 50; // Número de steps no fade
  const TARGET_VOLUME = 0.3; // Volume final (30%)

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || fadeIntervalRef.current) return;

    const stepTime = FADE_DURATION / FADE_STEPS;
    const volumeIncrement = TARGET_VOLUME / FADE_STEPS;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (!audio || currentStep >= FADE_STEPS) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        if (audio) audio.volume = TARGET_VOLUME;
        return;
      }

      currentStep++;
      audio.volume = Math.min(volumeIncrement * currentStep, TARGET_VOLUME);
    }, stepTime);
  }, [FADE_DURATION, FADE_STEPS, TARGET_VOLUME]);

  const startPlaying = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.volume = 0;
      await audio.play();
      setIsPlaying(true);
      setNeedsInteraction(false);
      fadeIn();
      return true;
    } catch (error) {
      console.log("Não foi possível tocar:", error);
      setNeedsInteraction(true);
      return false;
    }
  }, [fadeIn]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || hasTriedAutoplay.current) return;

    hasTriedAutoplay.current = true;
    audio.loop = true;
    audio.volume = 0;

    // Tentar tocar automaticamente
    const tryAutoplay = async () => {
      const success = await startPlaying();

      if (!success) {
        // Autoplay bloqueado - só mostrar o botão
        console.log("Aguardando usuário clicar no botão para tocar a música");
      }
    };

    tryAutoplay();

    // Cleanup
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, [startPlaying]);

  const fadeOut = (callback?: () => void) => {
    const audio = audioRef.current;
    if (!audio || fadeIntervalRef.current) return;

    const stepTime = FADE_DURATION / FADE_STEPS;
    const volumeDecrement = audio.volume / FADE_STEPS;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (!audio || currentStep >= FADE_STEPS) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        if (audio) audio.volume = 0;
        callback?.();
        return;
      }

      currentStep++;
      audio.volume = Math.max(audio.volume - volumeDecrement, 0);
    }, stepTime);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      fadeOut(() => {
        audio.pause();
        setIsPlaying(false);
      });
    } else {
      audio.play();
      setIsPlaying(true);
      fadeIn();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicFile} preload="auto" />

      {/* Controle flutuante */}
      {needsInteraction ? (
        <button
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Botão clicado, tentando tocar música");
            const success = await startPlaying();
            console.log("Resultado:", success ? "Tocando" : "Falhou");
          }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent/90 backdrop-blur-sm border-2 border-accent shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 group animate-pulse"
          aria-label="Tocar música"
        >
          <Play className="w-6 h-6 text-background group-hover:text-background transition-colors fill-background" />
        </button>
      ) : isPlaying && !isMuted ? (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 group"
          aria-label="Silenciar música"
        >
          <Volume2 className="w-6 h-6 text-primary group-hover:text-primary/80 transition-colors" />
        </button>
      ) : isPlaying && isMuted ? (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 group"
          aria-label="Ativar som"
        >
          <VolumeX className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      ) : null}
    </>
  );
};
