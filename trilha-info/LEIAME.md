# Trilha Info – Técnico em Informática (IFRN)

Site estático (HTML + CSS + JavaScript). Não precisa instalar nada.

## Estrutura
- `index.html`  → estrutura da página
- `css/style.css` → cores e visual (variáveis no topo: `--g` verde, `--r` vermelho)
- `js/dados.js` → **disciplinas, etapas e quizzes** (o arquivo que você mais vai editar)
- `js/app.js` → lógica: progresso, ofensiva, janelas e quiz

## Como usar no VS Code
1. Abra a pasta (File > Open Folder).
2. Instale a extensão **Live Server** e clique em "Go Live" para ver as mudanças ao salvar.

## Como editar
- Nova disciplina/etapa: em `dados.js`, na lista `YEARS`.
- Novo quiz: em `dados.js`, no objeto `QUIZ`, usando o nome exato da disciplina.
  Cada pergunta: `["Pergunta", ["op A","op B","op C","op D"], índiceDaCorreta]`

## Publicar de graça
GitHub Pages: envie a pasta para um repositório e ative Settings > Pages.

## Exercícios e PDFs por etapa
1. Coloque os arquivos na pasta `materiais/` (ex.: `materiais/intro-prog/etapa1-lista1.pdf`).
2. Em `js/dados.js`, no objeto `EXERCICIOS`, liste os materiais de cada etapa (veja o exemplo comentado no arquivo).
3. Também dá para apontar para um link externo com `url:`.
Estrutura da disciplina: a playlist fica no topo e, abaixo, as etapas com os exercícios.

## Como criar quizzes
Em `js/dados.js`, no objeto `QUIZ`, use o nome exato da disciplina. Cada pergunta:
`["Pergunta", ["A", "B", "C", "D"], indiceDaCorreta, "explicação", etapa]`
- `indiceDaCorreta` começa em 0; `etapa` (opcional) também. Com `etapa`, o quiz ganha um menu por etapa.

## Playlist que toca no site
Em `js/dados.js`, no objeto `PLAYLISTS`, cole o trecho depois de `list=` da URL da playlist. Na aba "Etapas" da disciplina aparece o botão "Assistir playlist completa": o aluno clica e a playlist começa a tocar dentro do site, com a lista de aulas ao lado do vídeo. A playlist deve ser pública ou não listada, e o dono precisa permitir a incorporação.
