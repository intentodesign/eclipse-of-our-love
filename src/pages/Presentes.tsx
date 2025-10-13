import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DollarSign,
  Clock
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
import { openPresentReminder } from "@/utils/calendar";

interface Present {
  id: number;
  name: string;
  price: number;
  icon: typeof Coffee;
  available: boolean;
  paymentLink: string;
}

interface ContributionOption {
  id: number;
  value: number;
  label: string;
  description: string;
  paymentLink: string;
}

const Presentes = () => {
  const navigate = useNavigate();
  const [showNoGiftDialog, setShowNoGiftDialog] = useState(false);
  const [showVaquinha, setShowVaquinha] = useState(false);
  const [selectedPresent, setSelectedPresent] = useState<Present | null>(null);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [reminderItem, setReminderItem] = useState<{ name: string; value: number; link: string } | null>(null);

  // Data padrão: amanhã às 19h
  const getDefaultReminderDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(19, 0, 0, 0);
    return tomorrow.toISOString().slice(0, 16); // formato: YYYY-MM-DDTHH:mm
  };

  const [reminderDateTime, setReminderDateTime] = useState(getDefaultReminderDate());

  const presents: Present[] = [
    { id: 1, name: "Jogo de Toalhas", price: 80, icon: Bed, available: true, paymentLink: "https://mpago.li/1gHyXWW" },
    { id: 2, name: "Cafeteira", price: 120, icon: Coffee, available: true, paymentLink: "https://mpago.li/19HvsaU" },
    { id: 3, name: "Jogo de Panelas", price: 180, icon: Utensils, available: true, paymentLink: "https://mpago.li/1zLY8Ve" },
    { id: 4, name: "Airfryer", price: 250, icon: Wind, available: true, paymentLink: "https://mpago.li/1nCLwYr" },
    { id: 5, name: "Aparelho de Jantar", price: 200, icon: UtensilsCrossed, available: true, paymentLink: "https://mpago.li/2ciB29K" },
    { id: 6, name: "Kit Utensilios de Cozinha", price: 150, icon: Utensils, available: true, paymentLink: "https://mpago.li/1FP37Dv" },
  ];

  const contributionOptions: ContributionOption[] = [
    { id: 1, value: 20, label: "R$ 20", description: "Um pastel com caldo de cana na orla de Aracaju", paymentLink: "https://mpago.li/2z5zP3k" },
    { id: 2, value: 50, label: "R$ 50", description: "Um hambúrguer do Burger King", paymentLink: "https://mpago.li/1waPnoe" },
    { id: 3, value: 200, label: "R$ 200", description: "Um jantar especial", paymentLink: "https://mpago.li/2uzmT6x" },
    { id: 4, value: 300, label: "R$ 300", description: "Uma viagem a Maceió", paymentLink: "https://mpago.li/2DPgzk1" },
    { id: 5, value: 0, label: "Outro valor", description: "Escolha quanto deseja contribuir", paymentLink: "https://link.mercadopago.com.br/leaveyourmark" },
  ];

  const [selectedContribution, setSelectedContribution] = useState<ContributionOption | null>(null);

  const handlePresentClick = (present: Present) => {
    setSelectedPresent(present);
  };

  const handleBuyPresent = () => {
    if (!selectedPresent) return;

    toast.success(`Obrigado por escolher ${selectedPresent.name}!`, {
      description: "Você será redirecionado para o pagamento.",
      duration: 2000,
    });

    // Redireciona para o Mercado Pago
    setTimeout(() => {
      window.location.href = selectedPresent.paymentLink;
    }, 2000);
  };

  const handleNoGift = () => {
    setShowNoGiftDialog(false);
    setShowVaquinha(true);
  };

  const handleConfirmContribution = () => {
    if (!selectedContribution) return;

    toast.success("Muito obrigado! 💝", {
      description: "Você será redirecionado para o pagamento.",
      duration: 2000,
    });

    // Redireciona para o Mercado Pago
    setTimeout(() => {
      window.location.href = selectedContribution.paymentLink;
    }, 2000);
  };

  const handleNoContribution = () => {
    navigate('/obrigado');
  };

  const handleRemindMeLater = (name: string, value: number, link: string) => {
    setReminderItem({ name, value, link });
    setSelectedPresent(null); // Fecha o dialog do presente
    setSelectedContribution(null); // Fecha o dialog da vaquinha (se aplicável)
    setShowReminderDialog(true);
  };

  const handleCreateReminder = () => {
    if (!reminderItem) return;

    const reminderDate = new Date(reminderDateTime);

    openPresentReminder(
      reminderItem.name,
      reminderItem.value,
      reminderItem.link,
      reminderDate
    );

    toast.success("Lembrete criado! 📅", {
      description: "O evento foi adicionado ao seu calendário.",
      duration: 3000,
    });

    setShowReminderDialog(false);
    setReminderItem(null);
    setReminderDateTime(getDefaultReminderDate());
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
                    onClick={() => setSelectedContribution(option)}
                    className={`p-6 rounded-lg border-2 transition-smooth text-left hover:shadow-soft ${
                      selectedContribution?.id === option.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 bg-background/30 hover:bg-background/50'
                    }`}
                  >
                    <p className="text-2xl font-bold text-foreground mb-1">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </button>
                ))}
              </div>

              {selectedContribution && (
                <div className="flex flex-col gap-4 justify-center items-center animate-fadeIn max-w-md mx-auto">
                  <Button
                    size="lg"
                    onClick={handleConfirmContribution}
                    className="w-full bg-gradient-eclipse hover:opacity-90 text-foreground font-medium px-8 py-6 text-lg shadow-glow transition-smooth"
                  >
                    Quero Contribuir{selectedContribution.value > 0 ? ` com ${selectedContribution.label}` : ''}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleRemindMeLater(
                      selectedContribution.value > 0 ? `Vaquinha - ${selectedContribution.label}` : 'Vaquinha - Valor personalizado',
                      selectedContribution.value,
                      selectedContribution.paymentLink
                    )}
                    className="w-full border-accent/30 hover:bg-accent/10"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Não posso agora, lembrar-me depois
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
            <div className="flex flex-col gap-3 mt-4">
              <Button
                onClick={handleBuyPresent}
                className="w-full bg-gradient-eclipse hover:opacity-90 text-foreground shadow-glow"
              >
                Confirmar Presente
              </Button>
              <Button
                variant="outline"
                onClick={() => handleRemindMeLater(selectedPresent.name, selectedPresent.price, selectedPresent.paymentLink)}
                className="w-full border-accent/30 hover:bg-accent/10"
              >
                <Clock className="w-4 h-4 mr-2" />
                Não posso agora, lembrar-me depois
              </Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedPresent(null)}
                className="w-full"
              >
                Cancelar
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

      {/* Dialog para criar lembrete */}
      <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              Criar Lembrete
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              {reminderItem && (
                <div className="space-y-4">
                  <p className="text-foreground">
                    <strong>Presente:</strong> {reminderItem.name}
                  </p>
                  <p className="text-foreground">
                    <strong>Valor:</strong> R$ {reminderItem.value.toFixed(2)}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Escolha quando você quer ser lembrado de dar este presente. Um evento será criado no seu calendário com o link direto para o pagamento.
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="reminderDateTime" className="text-base">
                Data e hora do lembrete
              </Label>
              <Input
                id="reminderDateTime"
                type="datetime-local"
                value={reminderDateTime}
                onChange={(e) => setReminderDateTime(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary transition-smooth"
              />
              <p className="text-xs text-muted-foreground">
                Padrão: Amanhã às 19h (melhor horário para compras! 😉)
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowReminderDialog(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateReminder}
                className="flex-1 bg-gradient-eclipse hover:opacity-90 text-foreground shadow-glow"
              >
                <Clock className="w-4 h-4 mr-2" />
                Criar Lembrete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Presentes;
