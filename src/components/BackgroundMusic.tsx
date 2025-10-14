import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import musicFile from "@/assets/the-vow.mp3";

export const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const FADE_DURATION = 2000; // 2 segundos para fade in/out
  const FADE_STEPS = 50; // Número de steps no fade
  const TARGET_VOLUME = 0.3; // Volume final (30%)

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configurar áudio
    audio.loop = true;
    audio.volume = 0; // Começa mudo

    // Tentar tocar automaticamente
    const playWithFadeIn = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        fadeIn();
      } catch (error) {
        console.log("Autoplay bloqueado, aguardando interação do usuário");
        // Adicionar listener para primeira interação do usuário
        const handleFirstInteraction = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
            fadeIn();
            document.removeEventListener("click", handleFirstInteraction);
            document.removeEventListener("touchstart", handleFirstInteraction);
          } catch (err) {
            console.error("Erro ao tocar música:", err);
          }
        };

        document.addEventListener("click", handleFirstInteraction, { once: true });
        document.addEventListener("touchstart", handleFirstInteraction, { once: true });
      }
    };

    playWithFadeIn();

    // Cleanup
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      audio.pause();
    };
  }, []);

  const fadeIn = () => {
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
  };

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
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 group"
        aria-label={isMuted ? "Ativar som" : "Silenciar"}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
        ) : (
          <Volume2 className="w-6 h-6 text-primary group-hover:text-primary/80 transition-colors" />
        )}
      </button>
    </>
  );
};
