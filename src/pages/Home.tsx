import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EclipseDecoration } from "@/components/EclipseDecoration";
import { StarField } from "@/components/StarField";
import { Calendar, MapPin, Heart, Eclipse } from "lucide-react";
import { useNavigate } from "react-router-dom";
import eclipseHero from "@/assets/eclipse-hero.jpg";

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
            <Eclipse className="w-16 h-16 md:w-20 md:h-20 text-primary float-animation" />
            <Heart className="w-8 h-8 text-accent fill-accent shimmer" />
            <Eclipse className="w-16 h-16 md:w-20 md:h-20 text-secondary float-animation" style={{ animationDelay: '1s' }} />
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight uppercase">
            Gabriel e Duda
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Celebramos nossa união e o início de uma nova jornada juntos
          </p>

          <div className="flex items-center justify-center gap-3 text-accent text-lg">
            <div className="w-12 h-px bg-accent/30" />
            <span className="font-serif italic">Nosso casamento</span>
            <div className="w-12 h-px bg-accent/30" />
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-soft backdrop-blur-sm bg-card/80 border-primary/20 p-8 md:p-12">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground uppercase">
                Celebre Conosco
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-2">Data</h3>
                    <p className="text-muted-foreground text-lg font-medium">16 de Janeiro de 2026</p>
                    <p className="text-muted-foreground text-sm">17h às 21h</p>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-2">Local</h3>
                    <p className="text-muted-foreground">Salão de Festas do</p>
                    <p className="text-muted-foreground font-medium mb-2">Condomínio Versatto</p>
                    <a
                      href="https://maps.app.goo.gl/AK1pcd9De3SZ1fQf6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm underline transition-smooth"
                    >
                      Abrir no mapa
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border/50 mt-12">
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                  Será uma alegria compartilhar este momento especial com você.
                  Venha celebrar conosco o nosso amor e o início de nossa vida juntos.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    onClick={() => navigate('/confirmar')}
                    className="bg-gradient-eclipse hover:opacity-90 text-foreground font-medium px-8 py-6 text-lg shadow-glow transition-smooth"
                  >
                    Confirmar Presença
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      const event = {
                        title: 'Casamento Gabriel e Duda',
                        description: 'Celebração do casamento de Gabriel e Duda',
                        location: 'Salão de Festas Condomínio Versatto',
                        start: '20260116T170000',
                        end: '20260116T210000'
                      };
                      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.start}/${event.end}`;
                      window.open(url, '_blank');
                    }}
                    className="border-primary/30 hover:bg-primary/10 transition-smooth"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Adicionar ao Calendário
                  </Button>
                </div>
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
