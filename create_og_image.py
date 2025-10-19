from PIL import Image, ImageDraw, ImageFont
import os

# Dimensões do Open Graph (recomendado pelo Facebook/WhatsApp)
OG_WIDTH = 1200
OG_HEIGHT = 630

# Criar imagem com fundo gradiente
img = Image.new('RGB', (OG_WIDTH, OG_HEIGHT), color='#1a1625')

# Criar gradiente do fundo (do roxo escuro para um pouco mais claro)
draw = ImageDraw.Draw(img)
for y in range(OG_HEIGHT):
    # Gradiente sutil do topo pro fundo
    r = int(26 + (y / OG_HEIGHT) * 10)
    g = int(22 + (y / OG_HEIGHT) * 10)
    b = int(37 + (y / OG_HEIGHT) * 15)
    draw.rectangle([(0, y), (OG_WIDTH, y+1)], fill=(r, g, b))

# Abrir e redimensionar o logo
logo_path = "src/assets/wedding-symbol.png"
if os.path.exists(logo_path):
    logo = Image.open(logo_path)
    # Redimensionar logo mantendo proporção
    logo_height = 280
    logo_width = int(logo.width * (logo_height / logo.height))
    logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)

    # Colar logo no centro superior
    logo_x = (OG_WIDTH - logo_width) // 2
    logo_y = 100

    # Se o logo tem transparência, usar paste com máscara
    if logo.mode == 'RGBA':
        img.paste(logo, (logo_x, logo_y), logo)
    else:
        img.paste(logo, (logo_x, logo_y))

# Adicionar texto
draw = ImageDraw.Draw(img)

# Tentar usar fonte elegante, senão usar padrão
try:
    # Fonte grande para os nomes
    font_names = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 80)
    font_subtitle = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 36)
except:
    # Fallback para fonte padrão
    font_names = ImageFont.load_default()
    font_subtitle = ImageFont.load_default()

# Texto principal
text_main = "Gabriel e Duda"
text_sub = "16 de Janeiro de 2026"

# Calcular posições centralizadas
bbox_main = draw.textbbox((0, 0), text_main, font=font_names)
text_width_main = bbox_main[2] - bbox_main[0]
text_x_main = (OG_WIDTH - text_width_main) // 2
text_y_main = 420

bbox_sub = draw.textbbox((0, 0), text_sub, font=font_subtitle)
text_width_sub = bbox_sub[2] - bbox_sub[0]
text_x_sub = (OG_WIDTH - text_width_sub) // 2
text_y_sub = 530

# Desenhar texto com cor dourada/clara
text_color = '#e8d5b7'
draw.text((text_x_main, text_y_main), text_main, fill=text_color, font=font_names)
draw.text((text_x_sub, text_y_sub), text_sub, fill=text_color, font=font_subtitle)

# Salvar imagem
img.save("public/og-image.png", "PNG", quality=95)
print("Imagem OG criada com sucesso!")
