import { useEffect, useRef, useState } from 'react';
import { PageFlip } from 'page-flip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PhotoFlipbookProps {
  photos: string[];
  className?: string;
}

export const PhotoFlipbook = ({ photos, className = '' }: PhotoFlipbookProps) => {
  const bookRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!bookRef.current) return;

    const container = bookRef.current;

    // Aguardar o próximo frame para garantir que o DOM está pronto
    const timeoutId = setTimeout(() => {
      try {
        // Verificar se o container ainda existe
        if (!container || !container.isConnected) return;

        // Verificar se há páginas disponíveis
        const pages = container.querySelectorAll('.page');
        if (!pages || pages.length === 0) return;

        // Criar o flipbook
        const pageFlip = new PageFlip(container, {
          width: 300,
          height: 400,
          size: 'stretch',
          minWidth: 280,
          maxWidth: 350,
          minHeight: 370,
          maxHeight: 450,
          showCover: true,
          flippingTime: 800,
          usePortrait: true,
          startPage: 0,
          drawShadow: true,
          mobileScrollSupport: false,
          swipeDistance: 30,
          clickEventForward: true,
          useMouseEvents: true,
          maxShadowOpacity: 0.5,
        });

        pageFlipRef.current = pageFlip;

        // Carregar páginas do HTML
        pageFlip.loadFromHTML(pages as NodeListOf<HTMLElement>);

        setTotalPages(photos.length);

        // Event listeners
        pageFlip.on('flip', (e: any) => {
          setCurrentPage(e.data);
        });
      } catch (error) {
        console.error('Erro ao inicializar flipbook:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy();
        } catch (error) {
          console.error('Erro ao destruir flipbook:', error);
        }
        pageFlipRef.current = null;
      }
    };
  }, [photos]);

  const nextPage = () => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipNext();
    }
  };

  const prevPage = () => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipPrev();
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-6 ${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-2xl font-serif text-foreground mb-2">Nossa Galeria</h3>
        <p className="text-sm text-muted-foreground">Deslize ou toque para virar as páginas</p>
      </div>

      <div className="relative">
        <div ref={bookRef} className="flipbook-container">
          {/* Capa do livro */}
          <div className="page page-cover bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-primary/40">
            <div className="flex flex-col items-center justify-center h-full p-6">
              <h2 className="text-3xl font-serif text-foreground mb-4 text-center">Nossos Momentos</h2>
              <p className="text-muted-foreground text-center">Deslize para ver</p>
            </div>
          </div>

          {/* Páginas com fotos */}
          {photos.map((photo, index) => (
            <div key={index} className="page bg-background border-2 border-primary/20">
              <div className="w-full h-full p-3 flex items-center justify-center">
                <img
                  src={photo}
                  alt={`Momento ${index + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
            </div>
          ))}

          {/* Contracapa */}
          <div className="page page-cover bg-gradient-to-br from-secondary/30 to-primary/30 border-2 border-primary/40">
            <div className="flex flex-col items-center justify-center h-full p-6">
              <p className="text-xl font-serif text-foreground text-center">Gabriel & Duda</p>
              <p className="text-sm text-muted-foreground mt-2">16 de Janeiro de 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-6">
        <Button
          variant="outline"
          size="icon"
          onClick={prevPage}
          disabled={currentPage === 0}
          className="rounded-full border-primary/40 hover:bg-primary/10"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="text-sm text-muted-foreground min-w-[60px] text-center">
          {currentPage} / {totalPages}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={nextPage}
          disabled={currentPage >= totalPages}
          className="rounded-full border-primary/40 hover:bg-primary/10"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <style>{`
        .flipbook-container {
          margin: 0 auto;
        }

        .page {
          background-color: hsl(var(--card));
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }

        .page img {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};
