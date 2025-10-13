import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EclipseDecoration } from "@/components/EclipseDecoration";
import { StarField } from "@/components/StarField";
import { Gift, Heart, DollarSign, Home as HomeIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const Presentes = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleContribute = (value: number) => {
    setSelectedValue(value);
  };

  const handleConfirmContribution = () => {
    toast.success("Muito obrigado! 💝", {
      description: "Entre em contato conosco para receber os dados bancários para contribuição.",
      duration: 4000,
    });
  };

  const contributionOptions = [
    { id: 1, value: 50, label: "R$ 50", description: "Uma pequena lembrança" },
    { id: 2, value: 100, label: "R$ 100", description: "Ajuda especial" },
    { id: 3, value: 200, label: "R$ 200", description: "Contribuição generosa" },
    { id: 4, value: 300, label: "R$ 300", description: "Presente incrível" },
    { id: 5, value: 500, label: "R$ 500", description: "Presente maravilhoso" },
    { id: 6, value: 0, label: "Outro valor", description: "Escolha quanto deseja" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden py-20 px-4">
      <StarField />
      <EclipseDecoration className="top-20 left-10 opacity-20" />
      <EclipseDecoration className="bottom-20 right-10 opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto">
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
          <Gift className="w-12 h-12 mx-auto mb-4 text-secondary shimmer" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 uppercase">
            Contribua com Nosso Sonho
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sua contribuição nos ajudará a construir nosso novo lar e realizar sonhos juntos
          </p>
        </div>

        <Card className="shadow-soft backdrop-blur-sm bg-card/80 border-primary/20 p-8 md:p-10 mb-8">
          <div className="text-center mb-8">
            <DollarSign className="w-10 h-10 mx-auto mb-4 text-primary" />
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
                onClick={() => handleContribute(option.value)}
                className={`p-6 rounded-lg border-2 transition-smooth text-left hover:shadow-soft ${
                  selectedValue === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border/50 bg-background/30 hover:bg-background/50'
                }`}
              >
                <p className="text-2xl font-bold text-foreground mb-1">{option.label}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </button>
            ))}
          </div>

          {selectedValue !== null && (
            <div className="animate-fadeIn">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    onClick={handleConfirmContribution}
                    className="w-full bg-gradient-eclipse hover:opacity-90 text-foreground font-medium py-6 text-lg shadow-glow transition-smooth"
                  >
                    Quero Contribuir{selectedValue > 0 ? ` com ${contributionOptions.find(o => o.value === selectedValue)?.label}` : ''}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl">Muito Obrigado!</DialogTitle>
                    <DialogDescription className="text-base pt-4 space-y-4">
                      <p>
                        Para realizar sua contribuição, entre em contato conosco através do WhatsApp para receber os dados bancários.
                      </p>
                      <p className="text-foreground font-medium">
                        Sua generosidade significa muito para nós e nos ajudará a realizar nossos sonhos! 💫
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <Button
                      onClick={() => navigate('/')}
                      variant="outline"
                      className="w-full"
                    >
                      Voltar para o início
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </Card>

        <Card className="shadow-soft backdrop-blur-sm bg-card/80 border-accent/20 p-8 text-center">
          <Heart className="w-10 h-10 mx-auto mb-4 text-accent fill-accent/20" />
          <h2 className="text-2xl font-serif font-semibold mb-4 uppercase">
            Não Pode Contribuir?
          </h2>
          <p className="text-muted-foreground mb-6">
            Não se preocupe! Sua presença na celebração já é o maior presente para nós. 💝
          </p>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="border-accent/30 hover:bg-accent/10 transition-smooth"
          >
            Voltar para o convite
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Presentes;
