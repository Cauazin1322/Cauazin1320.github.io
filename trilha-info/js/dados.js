// DADOS DO SITE: edite aqui disciplinas, etapas e quizzes.
// Formato de cada disciplina: "emoji|Nome|Etapa 1|Etapa 2|..."
const YEARS = [
  {
    n: 1,
    t: "Primeiros passos",
    d: "Lógica, páginas web, o computador no dia a dia e a base de eletricidade.",
    c: [
      "|Introdução à Programação|Lógica e algoritmos|Variáveis e tipos de dados|Condicionais (se/senão)|Laços de repetição|Vetores e funções",
      "|Autoria Web|HTML: estrutura de uma página|CSS: cores e textos|Layout e responsividade|Publicando sua página",
      "|Educação em Tecnologias Digitais|Uso seguro do computador|Arquivos e pastas|Editor de texto e planilhas|Cidadania digital",
      "|Eletricidade Instrumental|Grandezas elétricas|Lei de Ohm|Circuitos série e paralelo|Potência e energia",
      "|Matemática I (apoio)|Conjuntos e lógica|Funções|Progressões",
    ],
  },
  {
    n: 2,
    t: "Construindo bases",
    d: "Orientação a objetos, bancos de dados, redes e o hardware por dentro.",
    c: [
      "|Programação Orientada a Objetos|Classes e objetos|Encapsulamento|Herança e polimorfismo|Tratamento de erros",
      "|Projeto de Banco de Dados|Modelo entidade-relacionamento|Modelo relacional|SQL básico",
      "|Redes de Computadores|Conceitos e topologias|Modelo OSI e TCP/IP|Endereçamento IP",
      "|Organização e Montagem de Computadores|Componentes do computador|Sistemas de numeração|Montagem passo a passo",
      "|Eletrônica|Componentes eletrônicos|Diodos e transistores|Circuitos digitais",
    ],
  },
  {
    n: 3,
    t: "Colocando em prática",
    d: "Web, banco de dados na prática, projeto de software e manutenção.",
    c: [
      "|Programação para Internet|HTML, CSS e JavaScript|Requisições e formulários|Back-end básico",
      "|Programação com Acesso a Banco de Dados|Conexão com o banco|CRUD|Consultas e relatórios",
      "|Projeto de Desenvolvimento de Software|Levantamento de requisitos|Modelagem (UML)|Desenvolvimento em equipe|Testes e entrega",
      "|Infraestrutura de Redes|Cabeamento e equipamentos|Roteamento e sub-redes|Serviços de rede",
      "|Manutenção de Computadores|Diagnóstico de falhas|Manutenção preventiva|Instalação de sistemas",
    ],
  },
  {
    n: 4,
    t: "Reta final",
    d: "Sistemas operacionais de rede e tópicos específicos.",
    c: [
      "|Sistemas Operacionais de Redes|Linux no terminal|Usuários e permissões|Serviços e servidores",
      "|Tópicos Específicos em Informática I|Tema 1|Tema 2|Tema 3",
      "|Tópicos Específicos em Informática II|Tema 1|Tema 2|Tema 3",
    ],
  },
];

// ===== PLAYLIST DE CADA DISCIPLINA =====
// Cole em playlist: o trecho depois de list= na URL da playlist
// (youtube.com/playlist?list=ESTE_TRECHO). O aluno clica e a playlist
// toca dentro do site, com a lista de aulas ao lado do vídeo.
// A playlist precisa ser pública ou não listada, e o dono deve permitir incorporação.
const PLAYLISTS = {
  "Nome": { playlist: "", canal: "" },
  "Introdução à Programação": { playlist: "https://youtu.be/ycyL5CqZoUo?si=pnFY16u_RnJR2lpM", canal: "" },
  "Autoria Web": { playlist: "https://youtu.be/nlO5hySqJFA?si=R54RnTNwHk230g_5", canal: "Gustavo Guanabara" },
  "Educação em Tecnologias Digitais": { playlist: "", canal: "" },
  "Eletricidade Instrumental": { playlist: "https://youtu.be/IisroPnqW1w?si=F4wY7fvk3BNmZ5JF", canal: "Hexag educacional" },
  "Matemática I (apoio)": { playlist: "", canal: "" },
  "Programação Orientada a Objetos": { playlist: "", canal: "" },
  "Projeto de Banco de Dados": { playlist: "", canal: "" },
  "Redes de Computadores": { playlist: "", canal: "" },
  "Organização e Montagem de Computadores": { playlist: "", canal: "" },
  "Eletrônica": { playlist: "", canal: "" },
  "Programação para Internet": { playlist: "", canal: "" },
  "Programação com Acesso a Banco de Dados": { playlist: "", canal: "" },
  "Projeto de Desenvolvimento de Software": { playlist: "", canal: "" },
  "Infraestrutura de Redes": { playlist: "", canal: "" },
  "Manutenção de Computadores": { playlist: "", canal: "" },
  "Sistemas Operacionais de Redes": { playlist: "", canal: "" },
  "Tópicos Específicos em Informática I": { playlist: "", canal: "" },
  "Tópicos Específicos em Informática II": { playlist: "", canal: "" },
};

// ===== EXERCÍCIOS E MATERIAIS (por etapa) =====
// Chave = nome da disciplina; número = etapa (0 = 1ª etapa, 1 = 2ª, ...).
// arquivo: caminho do PDF dentro da pasta materiais/
// url: link externo (Google Drive, site, etc.)
// Exemplo (apague as barras // para ativar):
//
//   "Introdução à Programação": {
//     0: [
//       { titulo: "Lista 1 - Lógica", arquivo: "materiais/intro-prog/etapa1-lista1.pdf" },
//       { titulo: "Resumo", url: "https://..." },
//     ],
//   },
const EXERCICIOS = {};

// ===== QUIZZES =====
// Chave = nome da disciplina. Cada pergunta:
// ["Pergunta", ["opção A", "opção B", ...], índiceDaCorreta, "explicação", etapa]
// índiceDaCorreta começa em 0. etapa (opcional) começa em 0 e liga a pergunta à etapa.
const QUIZ = {
  "Introdução à Programação": [
    ["O que é um algoritmo?", ["Uma sequência finita de passos para resolver um problema", "Um tipo de computador", "Uma linguagem de programação", "Um site da internet"], 0, "Algoritmo é uma sequência finita e ordenada de passos, como uma receita.", 0],
    ["Qual destes é um exemplo de algoritmo?", ["Uma receita de bolo com passos numerados", "Uma foto da família", "O nome de um arquivo", "Uma senha"], 0, "Uma receita tem passos em ordem que levam a um resultado.", 0],
    ["Qual tipo de dado é o mais adequado para guardar “Maria”?", ["Inteiro", "Texto (string)", "Lógico", "Real"], 1, "Nomes são sequências de caracteres, ou seja, texto.", 1],
    ["Se idade = 15 e depois idade = idade + 1, qual é o valor final de idade?", ["14", "15", "16", "idade"], 2, "A variável recebe o valor antigo (15) mais 1.", 1],
    ["Se x = 5, qual é o resultado de x > 3?", ["Falso", "5", "Verdadeiro", "Erro"], 2, "5 é maior que 3, então a comparação resulta em verdadeiro.", 2],
    ["Em “se nota >= 7 então Aprovado senão Reprovado”, com nota = 6, o que aparece?", ["Aprovado", "Reprovado", "Nada", "Erro"], 1, "6 não é maior nem igual a 7, então executa o “senão”.", 2],
    ["Quantas vezes roda um laço que conta de 1 até 4?", ["3", "4", "5", "1"], 1, "Conta 1, 2, 3 e 4: são 4 repetições.", 3],
    ["Um laço “enquanto” em que a condição nunca fica falsa causa:", ["Laço infinito", "Resultado zero", "Erro de digitação", "Nada"], 0, "Sem algo que mude a condição, o laço nunca termina.", 3],
    ["Em um vetor com 5 posições (índice começa em 0), qual é o último índice?", ["5", "4", "0", "6"], 1, "Os índices vão de 0 a 4.", 4],
  ],
};
