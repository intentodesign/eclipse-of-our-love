import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EclipseDecoration } from "@/components/EclipseDecoration";
import { StarField } from "@/components/StarField";
import {
  Gift,
  Home as HomeIcon,
  Coffee,
  Utensils,
  Wind,
  Bed,
  Tv,
  UtensilsCrossed,
  Heart,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface Present {
  id: number;
  name: string;
  price: number;
  icon: typeof Coffee;
  available: boolean;
}

const Presentes = () => {
  const navigate = useNavigate();
  const [showNoGiftDialog, setShowNoGiftDialog] = useState(false);
  const [showVaquinha, setShowVaquinha] = useState(false);
  const [selectedPresent, setSelectedPresent] = useState<Present | null>(null);

  const presents: Present[] = [
    { id: 1, name: "Airfryer", price: 350, icon: Wind, available: true },
    { id: 2, name: "Cafeteira Expresso", price: 280, icon: Coffee, available: true },
    { id: 3, name: "Jogo de Panelas Premium", price: 450, icon: Utensils, available: true },
    { id: 4, name: "Jogo de Cama King", price: 320, icon: Bed, available: true },
    { id: 5, name: "Smart TV 50\"", price: 1800, icon: Tv, available: true },
    { id: 6, name: "Aparelho de Jantar 42 Peças", price: 380, icon: UtensilsCrossed, available: true },
  ];

  const contributionOptions = [
    { id: 1, value: 50, label: "R$ 50", description: "Uma pequena lembrança" },
    { id: 2, value: 100, label: "R$ 100", description: "Ajuda especial" },
    { id: 3, value: 200, label: "R$ 200", description: "Contribuição generosa" },
    { id: 4, value: 300, label: "R$ 300", description: "Presente incrível" },
    { id: 5, value: 500, label: "R$ 500", description: "Presente maravilhoso" },
    { id: 6, value: 0, label: "Outro valor", description: "Escolha quanto deseja" },
  ];

  const [selectedContribution, setSelectedContribution] = useState<number | null>(null);

  const handlePresentClick = (present: Present) => {
    setSelectedPresent(present);
  };

  const handleBuyPresent = () => {
    if (!selectedPresent) return;

    // TODO: Integrar com Mercado Pago
    toast.success(`Obrigado por escolher ${selectedPresent.name}!`, {
      description: "Você será redirecionado para o pagamento em breve.",
      duration: 4000,
    });

    // Por enquanto, apenas fecha o dialog
    // Quando o Mercado Pago estiver configurado, vai redirecionar para o link de pagamento
    setTimeout(() => {
      setSelectedPresent(null);
      navigate('/obrigado');
    }, 2000);
  };

  const handleNoGift = () => {
    setShowNoGiftDialog(false);
    setShowVaquinha(true);
  };

  const handleConfirmContribution = () => {
    toast.success("Muito obrigado! 💝", {
      description: "Entre em contato conosco para receber os dados bancários.",
      duration: 4000,
    });
    setTimeout(() => navigate('/obrigado'), 2000);
  };

  const handleNoContribution = () => {
    navigate('/obrigado');
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-20 px-4">
      <StarField />
      <EclipseDecoration className="top-20 left-10 opacity-20" />
      <EclipseDecoration className="bottom-20 right-10 opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto">
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

        {!showVaquinha ? (
          <>
            <div className="text-center mb-12 animate-fadeIn">
              <Gift className="w-12 h-12 mx-auto mb-4 text-secondary shimmer" />
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 uppercase">
                Lista de Presentes
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Escolha um presente para nos ajudar a construir nosso novo lar
              </p>
            </div>

            {/* Grid de Presentes */}
            <Card className="shadow-soft backdrop-blur-sm bg-card/80 border-primary/20 p-8 md:p-10 mb-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {presents.map((present) => {
                  const Icon = present.icon;
                  return (
                    <button
                      key={present.id}
                      onClick={() => handlePresentClick(present)}
                      disabled={!present.available}
                      className={`p-6 rounded-lg border-2 transition-smooth text-left group ${
                        present.available
                          ? 'border-border/50 bg-background/30 hover:bg-background/50 hover:border-primary hover:shadow-soft'
                          : 'border-border/30 bg-muted/20 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          present.available ? 'bg-primary/10 group-hover:bg-primary/20' : 'bg-muted/30'
                        } transition-smooth`}>
                          <Icon className={`w-8 h-8 ${present.available ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{present.name}</h3>
                          <p className="text-2xl font-bold text-primary">
                            R$ {present.price.toFixed(2)}
                          </p>
                          {!present.available && (
                            <p className="text-xs text-muted-foreground mt-2">Indisponível</p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Card "Não quer dar presente?" */}
            <Card className="shadow-soft backdrop-blur-sm bg-card/80 border-accent/20 p-8 text-center">
              <Heart className="w-10 h-10 mx-auto mb-4 text-accent fill-accent/20" />
              <h2 className="text-2xl font-serif font-semibold mb-4 uppercase">
                Não Quer Dar Presente?
              </h2>
              <p className="text-muted-foreground mb-6">
                Sem problema! Temos outras opções para você.
              </p>
              <Button
                onClick={() => setShowNoGiftDialog(true)}
                variant="outline"
                className="border-accent/30 hover:bg-accent/10 transition-smooth"
              >
                Não quero dar presente
              </Button>
            </Card>
          </>
        ) : (
          <>
            {/* Seção da Vaquinha */}
            <div className="text-center mb-12 animate-fadeIn">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-secondary shimmer" />
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 uppercase">
                Contribua com Nossa Lua de Mel
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Sua contribuição nos ajudará a realizar nossos sonhos juntos
              </p>
            </div>

            <Card className="shadow-soft backdrop-blur-sm bg-card/80 border-primary/20 p-8 md:p-10 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-semibold mb-2">
                  Escolha um Valor
                </h2>
                <p className="text-muted-foreground">
                  Qualquer contribuição será recebida com muito carinho
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {contributionOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedContribution(option.value)}
                    className={`p-6 rounded-lg border-2 transition-smooth text-left hover:shadow-soft ${
                      selectedContribution === option.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 bg-background/30 hover:bg-background/50'
                    }`}
                  >
                    <p className="text-2xl font-bold text-foreground mb-1">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </button>
                ))}
              </div>

              {selectedContribution !== null && (
                <div className="flex gap-4 justify-center animate-fadeIn">
                  <Button
                    size="lg"
                    onClick={handleConfirmContribution}
                    className="bg-gradient-eclipse hover:opacity-90 text-foreground font-medium px-8 py-6 text-lg shadow-glow transition-smooth"
                  >
                    Quero Contribuir{selectedContribution > 0 ? ` com R$ ${selectedContribution}` : ''}
                  </Button>
                </div>
              )}
            </Card>

            <Card className="shadow-soft backdrop-blur-sm bg-card/80 border-accent/20 p-8 text-center">
              <p className="text-muted-foreground mb-6">
                Não quer contribuir com a vaquinha?
              </p>
              <Button
                onClick={handleNoContribution}
                variant="outline"
                className="border-accent/30 hover:bg-accent/10 transition-smooth"
              >
                Não, obrigado
              </Button>
            </Card>
          </>
        )}
      </div>

      {/* Dialog para compra de presente */}
      {selectedPresent && (
        <Dialog open={!!selectedPresent} onOpenChange={() => setSelectedPresent(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">
                {selectedPresent.name}
              </DialogTitle>
              <DialogDescription className="text-base pt-4 space-y-4">
                <div className="flex items-center justify-center py-6">
                  {(() => {
                    const Icon = selectedPresent.icon;
                    return (
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                    );
                  })()}
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground mb-2">
                    R$ {selectedPresent.price.toFixed(2)}
                  </p>
                  <p className="text-muted-foreground">
                    Ao confirmar, você será redirecionado para o pagamento seguro.
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedPresent(null)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleBuyPresent}
                className="flex-1 bg-gradient-eclipse hover:opacity-90 text-foreground shadow-glow"
              >
                Confirmar Presente
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog "Não quer dar presente?" */}
      <Dialog open={showNoGiftDialog} onOpenChange={setShowNoGiftDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Que tal contribuir?</DialogTitle>
            <DialogDescription className="text-base pt-4 space-y-4">
              <p>
                Gostaria de contribuir com nossa vaquinha da lua de mel com qualquer valor?
              </p>
              <p className="text-foreground font-medium">
                Sua generosidade nos ajudará a realizar nossos sonhos! 💫
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={handleNoContribution}
              className="flex-1"
            >
              Não, obrigado
            </Button>
            <Button
              onClick={handleNoGift}
              className="flex-1 bg-gradient-eclipse hover:opacity-90 text-foreground shadow-glow"
            >
              Sim, quero contribuir!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Presentes;
