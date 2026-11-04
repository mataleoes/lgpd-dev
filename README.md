# LGPD no Desenvolvimento

Site educativo simples sobre **LGPD aplicada ao desenvolvimento de sistemas**, baseado nas aulas:

1. Direitos do titular e solicitações de dados (DSAR)
2. Anonimização e pseudonimização
3. Consentimento e aviso de privacidade

O aluno lê o conceito, responde perguntas e, ao final, gera um **relatório em TXT** (copiável/baixável) com respostas, desempenho e o roteiro da atividade prática de análise de formulário.

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (porta `4321`).

## Build para GitHub Pages

```bash
npm run build
```

A pasta `dist/` é o site estático. O projeto usa `base: './'` para funcionar em qualquer caminho do GitHub Pages (incluindo `username.github.io/nome-do-repo/`).

### Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie este código.
2. Em **Settings → Pages**:
   - Source: **GitHub Actions** (recomendado) ou branch `gh-pages` / pasta `/docs`.
3. Se usar o workflow incluso (`.github/workflows/deploy.yml`), o site publica automaticamente a cada push em `main`.
4. URL típica: `https://SEU_USUARIO.github.io/NOME_DO_REPO/`

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- 100% estático (sem backend)
