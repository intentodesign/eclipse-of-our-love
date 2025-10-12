import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EclipseDecoration } from "@/components/EclipseDecoration";
import { StarField } from "@/components/StarField";
import { Gift, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Presentes = () => {
  const [showVaquinha, setShowVaquinha] = useState(false);

  const handleNoGift = () => {
    setShowVaquinha(true);
  };

  const handleVaquinhaYes = () => {
    toast.success("Muito obrigado! 💝", {
      description: "Sua contribuição será muito especial para nossa lua de mel!",
    });
  };

  const handleVaquinhaNo = () => {
    toast.info("Tudo bem! 💫", {
      description: "Sua presença já é o maior presente para nós!",
    });
  };

  const giftList = [
    { id: 1, name: "Jogo de Panelas Premium", category: "Cozinha" },
    { id: 2, name: "Jogo de Cama Casal King", category: "Quarto" },
    { id: 3, name: "Aparelho de Jantar 42 Peças", category: "Mesa" },
    { id: 4, name: "Liquidificador de Alta Potência", category: "Cozinha" },
    { id: 5, name: "Cafeteira Expresso", category: "Cozinha" },
    { id: 6, name: "Conjunto de Toalhas de Banho", category: "Banho" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden py-20 px-4">
      <StarField />
      <EclipseDecoration className="top-20 left-10 opacity-20" />
      <EclipseDecoration className="bottom-20 right-10 opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fadeIn">
          <Gift className="w-12 h-12 mx-auto mb-4 text-secondary shimmer" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Lista de Presentes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Se desejar nos presentear, escolha algo que nos ajude a construir nosso novo lar
          </p>
        </div>

        <Card className="shadow-soft backdrop-blur-sm bg-card/80 border-primary/20 p-8 md:p-10 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {giftList.map((gift) => (
              <div 
                key={gift.id} 
                className="p-6 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-smooth hover:shadow-soft"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-primary font-medium mb-1">{gift.category}</p>
                    <h3 className="font-medium text-foreground">{gift.name}</h3>
                  </div>
                  <Sparkles className="w-5 h-5 text-accent flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-border/50">
            <p className="text-center text-muted-foreground mb-6">
              Entre em contato conosco para mais informações sobre os presentes
            </p>
          </div>
        </Card>

        <Card className="shadow-soft backdrop-blur-sm bg-card/80 border-accent/20 p-8 text-center">
          <Heart className="w-10 h-10 mx-auto mb-4 text-accent fill-accent/20" />
          <h2 className="text-2xl font-serif font-semibold mb-4">
            Não Quer Dar Presente?
          </h2>
          
          {!showVaquinha ? (
            <>
              <p className="text-muted-foreground mb-6">
                Não se preocupe! Sua presença já é o maior presente para nós.
              </p>
              <Button
                onClick={handleNoGift}
                variant="outline"
                className="border-accent/30 hover:bg-accent/10 transition-smooth"
              >
                Não quero dar presente
              </Button>
            </>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              <p className="text-lg text-foreground">
                Gostaria de ajudar nossa vaquinha da Lua de Mel?
              </p>
              <p className="text-muted-foreground">
                Qualquer contribuição será muito especial e nos ajudará a criar memórias inesquecíveis! ✨
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={handleVaquinhaYes}
                      className="bg-gradient-eclipse hover:opacity-90 text-foreground shadow-glow transition-smooth"
                    >
                      Sim, quero contribuir! 💝
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-2xl">Muito Obrigado!</DialogTitle>
                      <DialogDescription className="text-base pt-4">
                        Para contribuir com nossa lua de mel, entre em contato conosco para receber os dados bancários.
                        <br/><br/>
                        Sua generosidade significa muito para nós! 💫
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                
                <Button
                  onClick={handleVaquinhaNo}
                  variant="outline"
                  className="border-border/50 hover:bg-muted/50 transition-smooth"
                >
                  Não, obrigado
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Presentes;
