# 🚀 Guia de Publicação no GitHub

## Passo 1: Criar Repositório no GitHub

1. Acesse https://github.com e faça login
2. Clique no botão **"+"** no canto superior direito → **"New repository"**
3. Preencha:
   - **Repository name**: `batatas-mais-sabor-landing-page`
   - **Description**: "Landing page moderna para Batatas Mais Sabor"
   - **Visibilidade**: Public ou Private (sua escolha)
   - ⚠️ **NÃO marque** "Initialize this repository with a README"
4. Clique em **"Create repository"**

## Passo 2: Conectar e Fazer Push

Após criar o repositório, execute os seguintes comandos no terminal:

```bash
# Navegue até a pasta do projeto (se ainda não estiver)
cd "c:\Users\Guto\Desktop\batatas-mais-sabor---landing-page"

# Adicione o repositório remoto (substitua SEU-USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU-USUARIO/batatas-mais-sabor-landing-page.git

# Renomeie a branch para 'main' (padrão do GitHub)
git branch -M main

# Faça o push do código
git push -u origin main
```

## Alternativa: Usando SSH

Se você preferir usar SSH (recomendado para maior segurança):

```bash
git remote add origin git@github.com:SEU-USUARIO/batatas-mais-sabor-landing-page.git
git branch -M main
git push -u origin main
```

## Próximos Passos

Após o push, você poderá:
- Ver seu código no GitHub
- Configurar GitHub Pages para hospedar o site
- Adicionar colaboradores
- Criar issues e pull requests
- Configurar CI/CD

## Comandos Úteis

```bash
# Ver status do repositório
git status

# Adicionar mudanças
git add .

# Fazer commit
git commit -m "Descrição das mudanças"

# Fazer push
git push

# Ver histórico de commits
git log

# Ver repositórios remotos
git remote -v
```
