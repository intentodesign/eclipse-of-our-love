import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EclipseDecoration } from "@/components/EclipseDecoration";
import { StarField } from "@/components/StarField";
import { Calendar, MapPin, Heart, Eclipse } from "lucide-react";
import { useNavigate } from "react-router-dom";
import eclipseHero from "@/assets/eclipse-hero.jpg";
import proposalPhoto from "@/assets/proposal.jpg";
import gallery1 from "@/assets/gallery/gallery-1.jpg";
import gallery2 from "@/assets/gallery/gallery-2.jpg";
import gallery3 from "@/assets/gallery/gallery-3.jpg";
import gallery4 from "@/assets/gallery/gallery-4.jpg";
import gallery5 from "@/assets/gallery/gallery-5.jpg";
import gallery6 from "@/assets/gallery/gallery-6.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryPhotos = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

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

      {/* Our Story Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Gallery Parallax */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="relative h-full"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            {galleryPhotos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Momento ${index + 1}`}
                className="absolute w-64 h-64 object-cover rounded-lg opacity-10 blur-sm"
                style={{
                  top: `${index * 180}px`,
                  left: index % 2 === 0 ? '5%' : 'auto',
                  right: index % 2 === 1 ? '5%' : 'auto',
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Photo with simple border and animation */}
          <div className="flex justify-center mb-12">
            <div
              className="relative animate-in fade-in slide-in-from-bottom-8 duration-1000"
              style={{ animationDelay: '200ms' }}
            >
              <img
                src={proposalPhoto}
                alt="O pedido de casamento"
                className="w-full max-w-md rounded-lg shadow-soft border-4 border-primary/20"
              />
            </div>
          </div>

          {/* Story Card with animation */}
          <Card
            className="shadow-soft backdrop-blur-sm bg-card/80 border-primary/20 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-8 duration-1000"
            style={{ animationDelay: '400ms' }}
          >
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-px bg-accent/30" />
                <Heart className="w-6 h-6 text-accent fill-accent" />
                <div className="w-12 h-px bg-accent/30" />
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground uppercase mb-8">
                Nossa História
              </h2>

              <div className="space-y-6 text-muted-foreground leading-relaxed max-w-2xl mx-auto text-left">
                <p>
                  Alguns dias atrás ela me perguntou: <em className="text-foreground">"Quando você percebeu que me amava?"</em>
                </p>

                <p>
                  E eu realmente parei pra pensar…
                </p>

                <p>
                  Percebi que foi muito antes de derrubar o anel no chão do jeito mais desajeitado possível.
                </p>

                <p>
                  Foi muito antes também, de errar a mão de noivado, enquanto me ajoelhava na frente da família, por volta da meia-noite e quarenta do dia um.
                </p>

                <p>
                  Também foi antes de fazer um jantar a luz de velas e antes ainda de esconder o porta-anel num lugar que ela jamais acharia. Foi uma missão (quase) impossível.
                </p>

                <p>
                  Também foi antes de mentir dizendo que ia jogar com meu amigo, quando na verdade, ele me ajudou a escolher o anel perfeito (e isso, meus amigos, poderá e será usado contra mim num futuro não tão distante).
                </p>

                <p>
                  Foi antes de pegar uma rolha de um vinho qualquer (que agora não é mais um vinho qualquer) e cortá-la até caber dentro do anel de namoro que lhe dei há tempos atrás, e que se sumisse, ela perceberia no primeiro dia.
                </p>

                <p className="text-sm italic">
                  Eu esqueci que o primeiro tinha ficado folgado. Repeti o erro.
                </p>

                <p>
                  Foi antes de muita coisa, mas depois de pensar bastante, percebi que nunca houve uma linha clara entre o amor e o não-amor. Ele chega e fica. Um dia, de repente, você olha pro lado e percebe:
                </p>

                <p className="text-xl font-serif text-foreground text-center pt-4">
                  É ela! Sempre foi.
                </p>

                <p className="text-foreground font-medium text-center pt-4">
                  Te amo, minha noiva. Bem-vinda ao nosso início.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="w-12 h-px bg-accent/30" />
                <Heart className="w-6 h-6 text-accent fill-accent" />
                <div className="w-12 h-px bg-accent/30" />
              </div>
            </div>
          </Card>
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

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={() => navigate('/confirmar')}
                    className="bg-gradient-eclipse hover:opacity-90 text-foreground font-medium px-8 py-6 text-lg shadow-glow transition-smooth"
                  >
                    Confirmar Presença
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
