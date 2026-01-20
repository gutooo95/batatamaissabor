# 🚀 Deploy na Vercel - Guia Completo

## Opção 1: Deploy via CLI (Recomendado)

### Passo 1: Login na Vercel
```bash
vercel login
```
Isso abrirá o navegador para você fazer login com sua conta GitHub, Google ou Email.

### Passo 2: Deploy
```bash
vercel
```

Siga as instruções:
- **Set up and deploy?** → `Y`
- **Which scope?** → Selecione sua conta
- **Link to existing project?** → `N` (primeira vez)
- **What's your project's name?** → `batatas-mais-sabor-landing-page` (ou pressione Enter para usar o padrão)
- **In which directory is your code located?** → `./` (pressione Enter)

### Passo 3: Deploy de Produção
Após o deploy de preview, para fazer deploy em produção:
```bash
vercel --prod
```

## Opção 2: Deploy via Interface Web (Mais Fácil)

1. Acesse: https://vercel.com/new
2. Faça login com GitHub, Google ou Email
3. Clique em **"Import Git Repository"**
4. Selecione o repositório `batatas-mais-sabor-landing-page`
5. A Vercel detectará automaticamente:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Clique em **"Deploy"**

A Vercel fará o deploy automaticamente e você receberá uma URL como:
`https://batatas-mais-sabor-landing-page.vercel.app`

## Configurações Automáticas

O arquivo `vercel.json` já está configurado com:
- ✅ Build command correto
- ✅ Output directory (`dist`)
- ✅ Rewrites para SPA routing
- ✅ Cache headers para otimização

## Comandos Úteis

```bash
# Ver status do deploy
vercel ls

# Ver logs
vercel logs

# Remover um deploy
vercel remove [deployment-url]

# Ver informações do projeto
vercel inspect
```

## Domínio Personalizado

Após o deploy, você pode adicionar um domínio personalizado:
1. Acesse o projeto no dashboard da Vercel
2. Vá em **Settings** → **Domains**
3. Adicione seu domínio personalizado

## Atualizações Futuras

Para atualizar o site após mudanças:
```bash
# Fazer commit das mudanças
git add .
git commit -m "Descrição das mudanças"
git push

# Se conectado ao GitHub, a Vercel fará deploy automático
# Ou execute manualmente:
vercel --prod
```
