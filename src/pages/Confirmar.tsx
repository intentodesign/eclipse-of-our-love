import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EclipseDecoration } from "@/components/EclipseDecoration";
import { StarField } from "@/components/StarField";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Heart, Loader2, Home as HomeIcon } from "lucide-react";
import { APPS_SCRIPT_URL, IS_APPS_SCRIPT_CONFIGURED } from "@/config/api";

const Confirmar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    papel: "",
    parentesco: "",
    email: "",
    telefone: "",
  });
  const [showParentesco, setShowParentesco] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePapelChange = (value: string) => {
    setFormData({ ...formData, papel: value, parentesco: "" });
    setShowParentesco(value.includes("Família"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.papel) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (showParentesco && !formData.parentesco) {
      toast.error("Por favor, selecione o parentesco");
      return;
    }

    if (!IS_APPS_SCRIPT_CONFIGURED) {
      toast.warning("Apps Script não configurado", {
        description: "Os dados serão salvos localmente. Configure o Apps Script para salvar no Google Sheets.",
      });
      console.log("Dados do formulário:", formData);
      setTimeout(() => navigate("/presentes"), 2000);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script requer no-cors
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Com no-cors, não conseguimos ler a resposta, mas se não der erro, significa que funcionou
      toast.success("Presença confirmada com sucesso! ✨", {
        description: "Obrigado por confirmar. Redirecionando para os presentes...",
      });

      setTimeout(() => {
        navigate("/presentes");
      }, 2000);

    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      toast.error("Erro ao confirmar presença", {
        description: "Tente novamente mais tarde ou entre em contato conosco.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-20 px-4">
      <StarField />
      <EclipseDecoration className="top-20 right-10 opacity-20" />
      <EclipseDecoration className="bottom-20 left-10 opacity-20" />

      <div className="relative z-10 max-w-2xl mx-auto">
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
          <Heart className="w-12 h-12 mx-auto mb-4 text-accent fill-accent shimmer" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 uppercase">
            Confirme sua Presença
          </h1>
          <p className="text-lg text-muted-foreground">
            Sua presença tornará nosso dia ainda mais especial
          </p>
        </div>

        <Card className="shadow-soft backdrop-blur-sm bg-card/80 border-primary/20 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-base">
                Nome Completo *
              </Label>
              <Input
                id="nome"
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-primary transition-smooth"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="papel" className="text-base">
                Você é *
              </Label>
              <Select value={formData.papel} onValueChange={handlePapelChange}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary transition-smooth">
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/50">
                  <SelectItem value="familia-noiva">Família da Noiva</SelectItem>
                  <SelectItem value="familia-noivo">Família do Noivo</SelectItem>
                  <SelectItem value="amigo-noiva">Amigo(a) da Noiva</SelectItem>
                  <SelectItem value="amigo-noivo">Amigo(a) do Noivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {showParentesco && (
              <div className="space-y-2 animate-fadeIn">
                <Label htmlFor="parentesco" className="text-base">
                  Parentesco *
                </Label>
                <Select
                  value={formData.parentesco}
                  onValueChange={(value) => setFormData({ ...formData, parentesco: value })}
                >
                  <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary transition-smooth">
                    <SelectValue placeholder="Selecione o parentesco" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border/50">
                    <SelectItem value="mae">Mãe</SelectItem>
                    <SelectItem value="pai">Pai</SelectItem>
                    <SelectItem value="irmao">Irmão/Irmã</SelectItem>
                    <SelectItem value="tio">Tio/Tia</SelectItem>
                    <SelectItem value="primo">Primo/Prima</SelectItem>
                    <SelectItem value="avo">Avô/Avó</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Email (opcional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-primary transition-smooth"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-base">
                Telefone (opcional)
              </Label>
              <Input
                id="telefone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-primary transition-smooth"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gradient-eclipse hover:opacity-90 text-foreground font-medium py-6 text-lg shadow-glow transition-smooth disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Confirmando...
                </>
              ) : (
                'Confirmar Presença'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              * Campos obrigatórios
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Confirmar;
