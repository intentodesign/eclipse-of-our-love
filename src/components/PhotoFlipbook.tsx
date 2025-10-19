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
  const [isReady, setIsReady] = useState(false);

  // Total de páginas: capa + fotos + contracapa
  const totalPages = photos.length + 2;

  useEffect(() => {
    if (!bookRef.current) return;

    const container = bookRef.current;
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    // Aguardar o próximo frame para garantir que o DOM está pronto
    timeoutId = setTimeout(() => {
      try {
        // Verificar se o container ainda existe e está montado
        if (!mounted || !container || !container.isConnected) {
          console.log('Container não está mais montado, abortando inicialização');
          return;
        }

        // Verificar se há páginas disponíveis
        const pages = container.querySelectorAll('.page');
        if (!pages || pages.length === 0) {
          console.warn('Nenhuma página encontrada no flipbook');
          return;
        }

        // Não inicializar se já existe uma instância
        if (pageFlipRef.current) {
          console.log('Flipbook já inicializado, pulando');
          return;
        }

        console.log(`Inicializando flipbook com ${pages.length} páginas`);

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
          flippingTime: 600,
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

        // Event listeners
        pageFlip.on('flip', (e: any) => {
          console.log('Página virada:', e.data);
          if (mounted) {
            setCurrentPage(e.data);
          }
        });

        pageFlip.on('changeState', (e: any) => {
          console.log('Estado mudou:', e.data);
        });

        if (mounted) {
          setIsReady(true);
          console.log('Flipbook inicializado com sucesso');
        }
      } catch (error) {
        console.error('Erro ao inicializar flipbook:', error);
      }
    }, 300);

    return () => {
      console.log('Cleanup do flipbook chamado');
      mounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Só destruir se realmente estiver desmontando o componente
      // Não destruir em re-renders
      if (pageFlipRef.current) {
        try {
          // Usar setTimeout para destruir depois que o cleanup terminar
          setTimeout(() => {
            if (pageFlipRef.current && !mounted) {
              pageFlipRef.current.destroy();
              pageFlipRef.current = null;
              console.log('Flipbook destruído');
            }
          }, 0);
        } catch (error) {
          console.error('Erro ao destruir flipbook:', error);
        }
      }
    };
  }, []); // Removi photos da dependência para evitar re-inicializações

  const nextPage = () => {
    console.log('Tentando ir para próxima página');
    if (pageFlipRef.current && isReady) {
      try {
        pageFlipRef.current.flipNext();
        console.log('flipNext chamado');
      } catch (error) {
        console.error('Erro ao virar página:', error);
      }
    } else {
      console.warn('Flipbook não está pronto');
    }
  };

  const prevPage = () => {
    console.log('Tentando ir para página anterior');
    if (pageFlipRef.current && isReady) {
      try {
        pageFlipRef.current.flipPrev();
        console.log('flipPrev chamado');
      } catch (error) {
        console.error('Erro ao virar página:', error);
      }
    } else {
      console.warn('Flipbook não está pronto');
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-6 ${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-2xl font-serif text-foreground mb-2">Nossa Galeria</h3>
        <p className="text-sm text-muted-foreground">
          {isReady ? 'Deslize ou toque para virar as páginas' : 'Carregando...'}
        </p>
      </div>

      <div className="relative">
        <div ref={bookRef} className="flipbook-container">
          {/* Capa do livro */}
          <div className="page page-cover" data-density="hard">
            <div className="page-content">
              <div className="flex flex-col items-center justify-center h-full p-6">
                <h2 className="text-3xl font-serif text-foreground mb-4 text-center">Nossos Momentos</h2>
                <p className="text-muted-foreground text-center">Deslize para ver →</p>
              </div>
            </div>
          </div>

          {/* Páginas com fotos */}
          {photos.map((photo, index) => (
            <div key={index} className="page" data-density="soft">
              <div className="page-content">
                <div className="w-full h-full p-3 flex items-center justify-center">
                  <img
                    src={photo}
                    alt={`Momento ${index + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Contracapa */}
          <div className="page page-cover" data-density="hard">
            <div className="page-content">
              <div className="flex flex-col items-center justify-center h-full p-6">
                <p className="text-xl font-serif text-foreground text-center">Gabriel & Duda</p>
                <p className="text-sm text-muted-foreground mt-2">16 de Janeiro de 2026</p>
              </div>
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
          disabled={!isReady || currentPage === 0}
          className="rounded-full border-primary/40 hover:bg-primary/10 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="text-sm text-muted-foreground min-w-[80px] text-center">
          {isReady ? `${currentPage + 1} / ${totalPages}` : 'Carregando...'}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={nextPage}
          disabled={!isReady || currentPage >= totalPages - 1}
          className="rounded-full border-primary/40 hover:bg-primary/10 disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <style>{`
        .flipbook-container {
          margin: 0 auto;
          position: relative;
        }

        .page {
          background-color: hsl(var(--card));
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }

        .page-cover {
          background: linear-gradient(135deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--secondary) / 0.3) 100%);
          border: 2px solid hsl(var(--primary) / 0.4);
        }

        .page-content {
          width: 100%;
          height: 100%;
        }

        .page img {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          pointer-events: none;
          -webkit-user-drag: none;
        }
      `}</style>
    </div>
  );
};
