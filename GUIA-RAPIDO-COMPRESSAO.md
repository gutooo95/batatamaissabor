# 🚀 Guia Rápido: Comprimir Imagens para < 200ms

## ⚡ Método Mais Rápido (Recomendado)

### 1. Acesse Squoosh.app
👉 **https://squoosh.app/**

### 2. Para cada imagem:
1. **Arraste a imagem** para o site
2. **Configure**:
   - Formato: **WebP**
   - Quality: **80-85**
   - Resize: **Máximo 1920px** (se maior)
3. **Clique em Download**
4. **Substitua** a imagem original na pasta `public/images/`

### 3. Ordem de Prioridade:
1. ✅ `/images/hero/hero-background.png` (CRÍTICA - carrega primeiro)
2. ✅ `/images/logo/SEM FUNDO.png` (CRÍTICA - carrega primeiro)
3. ✅ `/images/embalagens/*.png` (carrega quando necessário)
4. ✅ `/images/lavouras/*.png` (carrega quando necessário)

## 📊 Tamanhos Esperados Após Compressão

| Imagem | Tamanho Atual | Tamanho Alvo | Redução |
|--------|---------------|--------------|---------|
| hero-background.png | ~1.9MB | < 200KB | ~90% |
| SEM FUNDO.png | ~1.9MB | < 50KB | ~97% |
| Embalagens | ~500KB cada | < 150KB | ~70% |
| Lavouras | ~1-2MB cada | < 200KB | ~85% |

## ✅ Checklist

- [ ] Comprimir hero-background.png
- [ ] Comprimir logo (SEM FUNDO.png)
- [ ] Comprimir todas as embalagens (7 imagens)
- [ ] Comprimir todas as lavouras (5 imagens)
- [ ] Testar o site e verificar tempo de carregamento

## 🎯 Resultado Esperado

Após compressão, o site deve carregar em **< 200ms** com:
- ✅ Lazy loading ativo
- ✅ Imagens otimizadas
- ✅ Code splitting
- ✅ Preload de recursos críticos

## 💡 Dica Extra

Se quiser manter PNG (sem WebP):
- Use **TinyPNG**: https://tinypng.com/
- Reduz ~70% do tamanho mantendo PNG
