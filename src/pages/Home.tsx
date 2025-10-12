import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EclipseDecoration } from "@/components/EclipseDecoration";
import { StarField } from "@/components/StarField";
import { Calendar, MapPin, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import eclipseHero from "@/assets/eclipse-hero.jpg";
import moonIcon from "@/assets/moon-icon.png";
import sunIcon from "@/assets/sun-icon.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarField />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <EclipseDecoration className="top-20 left-10 opacity-30" />
        <EclipseDecoration className="bottom-20 right-10 opacity-20" />
        
        <div className="absolute inset-0 z-0">
          <img 
            src={eclipseHero} 
            alt="Eclipse celestial background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-fadeIn">
          {/* Icons decorating the title */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <img src={sunIcon} alt="Sol" className="w-16 h-16 md:w-20 md:h-20 float-animation" />
            <Heart className="w-8 h-8 text-accent fill-accent shimmer" />
            <img src={moonIcon} alt="Lua" className="w-16 h-16 md:w-20 md:h-20 float-animation" style={{ animationDelay: '1s' }} />
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight">
            Eclipse: Sol & Lua
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Como o eclipse que une o sol e a lua em um momento raro e mágico, 
            celebramos a união de dois mundos que se complementam perfeitamente
          </p>

          <div className="flex items-center justify-center gap-3 text-accent text-lg">
            <div className="w-12 h-px bg-accent/30" />
            <span className="font-serif italic">Um amor celestial</span>
            <div className="w-12 h-px bg-accent/30" />
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-soft backdrop-blur-sm bg-card/80 border-primary/20 p-8 md:p-12">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
                Celebre Conosco
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-2">Data</h3>
                    <p className="text-muted-foreground">Em breve</p>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-2">Local</h3>
                    <p className="text-muted-foreground">Salão de Festas do</p>
                    <p className="text-muted-foreground font-medium">Condomínio Versatto</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border/50 mt-12">
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                  Assim como o eclipse representa o encontro perfeito entre o sol e a lua, 
                  nossa união celebra a harmonia entre dois corações que se encontraram 
                  e se complementam. Venha testemunhar este momento único e especial.
                </p>

                <Button 
                  size="lg"
                  onClick={() => navigate('/confirmar')}
                  className="bg-gradient-eclipse hover:opacity-90 text-foreground font-medium px-8 py-6 text-lg shadow-glow transition-smooth"
                >
                  Confirmar Presença
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Decorative bottom section */}
      <div className="h-32 bg-gradient-to-t from-primary/5 to-transparent" />
    </div>
  );
};

export default Home;
