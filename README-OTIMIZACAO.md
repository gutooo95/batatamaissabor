# Guia de Otimização de Imagens

## 🚀 Otimizações Implementadas

### 1. Lazy Loading
- Todas as imagens abaixo da dobra (fold) usam `loading="lazy"`
- Imagens críticas (logo, hero) usam `loading="eager"` e `fetchPriority="high"`

### 2. Formato WebP
- O código está preparado para usar WebP quando disponível
- Fallback automático para PNG/JPG se WebP não estiver disponível

### 3. Compressão de Imagens

#### Opção 1: Usando Squoosh (Recomendado - Online)
1. Acesse https://squoosh.app/
2. Faça upload das imagens de `public/images/`
3. Configure:
   - **Formato**: WebP
   - **Quality**: 80-85
   - **Resize**: Máximo 1920px de largura
4. Baixe e substitua as imagens originais

#### Opção 2: Usando TinyPNG (Online)
1. Acesse https://tinypng.com/
2. Faça upload das imagens
3. Baixe as versões otimizadas
4. Substitua as imagens originais

#### Opção 3: Usando Script Node.js (Requer Sharp)
```bash
npm install --save-dev sharp
node scripts/optimize-images.js
```

#### Opção 4: Usando ImageMagick (PowerShell)
```powershell
# Instale ImageMagick primeiro
choco install imagemagick
# Ou baixe de: https://imagemagick.org/script/download.php

.\scripts\compress-images.ps1
```

## 📊 Tamanhos Recomendados

### Hero Background
- **Tamanho**: 1920x1080px
- **Formato**: WebP
- **Qualidade**: 80-85
- **Tamanho alvo**: < 200KB

### Logo
- **Tamanho**: 512x512px (ou proporção original)
- **Formato**: WebP ou PNG-8
- **Qualidade**: 90
- **Tamanho alvo**: < 50KB

### Embalagens
- **Tamanho**: 800x1000px (ou proporção original)
- **Formato**: WebP
- **Qualidade**: 85
- **Tamanho alvo**: < 150KB cada

### Lavouras
- **Tamanho**: 1200x800px (ou proporção original)
- **Formato**: WebP
- **Qualidade**: 80
- **Tamanho alvo**: < 200KB cada

## ⚡ Outras Otimizações

### Build de Produção
```bash
npm run build
```

O Vite já está configurado para:
- Minificar código
- Code splitting
- Tree shaking
- Compressão de assets

### Verificar Performance
1. Abra DevTools (F12)
2. Vá em Network
3. Recarregue a página
4. Verifique o tempo de carregamento

### Meta Tags de Performance
- DNS Prefetch para recursos externos
- Preconnect para fontes
- Preload para recursos críticos
- Prefetch para recursos não críticos

## 🎯 Objetivo: < 200ms

Para atingir menos de 200ms:
1. ✅ Lazy loading implementado
2. ✅ Code splitting configurado
3. ⚠️ **Compressão de imagens** (faça manualmente usando as ferramentas acima)
4. ✅ Preload de recursos críticos
5. ✅ Otimização de fontes

**Próximo passo**: Comprima as imagens usando uma das ferramentas acima!
