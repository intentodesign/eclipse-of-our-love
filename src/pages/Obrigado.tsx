import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EclipseDecoration } from "@/components/EclipseDecoration";
import { StarField } from "@/components/StarField";
import { Heart, Home as HomeIcon, Sparkles, Calendar } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { openGoogleCalendar } from "@/utils/calendar";

const Obrigado = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const presente = searchParams.get('presente');
  const valor = searchParams.get('valor');

  return (
    <div className="min-h-screen relative overflow-hidden py-20 px-4">
      <StarField />
      <EclipseDecoration className="top-20 left-10 opacity-20" />
      <EclipseDecoration className="bottom-20 right-10 opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header com botão de voltar */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="hover:bg-primary/10 transition-smooth"
          >
            <HomeIcon className="w-4 h-4 mr-2" />
            Voltar para o início
          </Button>
        </div>

        <div className="text-center mb-12 animate-fadeIn">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Heart className="w-16 h-16 text-accent fill-accent shimmer" />
            <Sparkles className="w-12 h-12 text-secondary shimmer" style={{ animationDelay: '0.5s' }} />
            <Heart className="w-16 h-16 text-accent fill-accent shimmer" style={{ animationDelay: '1s' }} />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 uppercase leading-tight">
            Muito Obrigado!
          </h1>
          {presente && valor ? (
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {presente === 'vaquinha' ? `Sua contribuição de R$ ${valor}` : `Seu presente: ${presente}`}
            </p>
          ) : (
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Sua presença é o maior presente que poderíamos receber
            </p>
          )}
        </div>

        <Card className="shadow-soft backdrop-blur-sm bg-card/80 border-accent/20 p-10 md:p-14 text-center">
          <div className="space-y-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-eclipse flex items-center justify-center shadow-glow">
              <Heart className="w-10 h-10 text-foreground fill-foreground" />
            </div>

            <div className="space-y-6">
              {presente && valor ? (
                <>
                  <p className="text-lg md:text-xl text-foreground leading-relaxed">
                    Sua generosidade nos emociona profundamente. Este {presente === 'vaquinha' ? 'gesto' : 'presente'} nos ajudará a construir nossa vida juntos e será usado com muito carinho.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Cada vez que {presente === 'vaquinha' ? 'lembrarmos deste momento' : `usarmos ${presente.toLowerCase()}`}, vamos lembrar do seu apoio e do amor que você tem por nós. Muito obrigado por fazer parte da nossa história!
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg md:text-xl text-foreground leading-relaxed">
                    Saber que você estará ao nosso lado neste momento tão especial já nos enche de alegria e gratidão.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Sua presença é tudo o que precisamos para tornar nosso dia completo. Compartilhar nossa união com pessoas queridas como você é o maior presente que poderíamos receber.
                  </p>
                </>
              )}

              <div className="pt-6 border-t border-border/50">
                <p className="text-xl font-serif font-medium text-foreground mb-2">
                  Nos vemos no dia 16 de Janeiro de 2026!
                </p>
                <p className="text-muted-foreground">
                  17h no Salão de Festas do Condomínio Versatto
                </p>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <p className="text-sm text-muted-foreground italic">
                "O amor não é medido em presentes, mas em momentos compartilhados"
              </p>

              <div className="flex items-center justify-center gap-2 text-accent">
                <div className="w-16 h-px bg-accent/30" />
                <Sparkles className="w-4 h-4" />
                <div className="w-16 h-px bg-accent/30" />
              </div>

              <p className="text-lg font-serif text-foreground">
                Com carinho,<br />
                <span className="text-xl">Gabriel e Duda</span>
              </p>
            </div>

            <div className="pt-8">
              <Button
                size="lg"
                onClick={openGoogleCalendar}
                className="bg-gradient-eclipse hover:opacity-90 text-foreground font-medium px-10 py-6 text-lg shadow-glow transition-smooth"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Adicionar à Agenda
              </Button>
            </div>
          </div>
        </Card>

        {/* Card adicional com informações úteis */}
        <Card className="mt-8 shadow-soft backdrop-blur-sm bg-card/80 border-primary/20 p-8 text-center">
          <h3 className="text-xl font-serif font-semibold mb-4 text-foreground">
            Informações Úteis
          </h3>
          <div className="space-y-3 text-muted-foreground">
            <p>📍 Não esqueça de adicionar o evento ao seu calendário</p>
            <p>🗺️ Confira a localização exata no mapa</p>
            <p>👔 Dress code: Traje social</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Obrigado;
