export type QuizOption = {
  id: string
  label: string
  correct?: boolean
}

export type QuizQuestion = {
  id: string
  prompt: string
  options: QuizOption[]
  explanation: string
}

export type Lesson = {
  id: string
  title: string
  subtitle: string
  bullets: string[]
  highlight: string
  questions: QuizQuestion[]
}

export type FormElementAnalysis = {
  id: string
  name: string
  present: string
  clear: string
  informs: string
  improve: string
}

export const lessons: Lesson[] = [
  {
    id: 'direitos',
    title: 'Quem é o titular e quais são seus direitos',
    subtitle:
      'Titular é a pessoa a quem os dados se referem. Depois do cadastro, ela continua tendo direitos sobre essas informações.',
    bullets: [
      'Pedir confirmação se seus dados estão sendo tratados.',
      'Pedir acesso (ver quais dados a plataforma guarda).',
      'Pedir correção de dados incompletos ou errados.',
      'Em certos casos, pedir anonimização, bloqueio ou eliminação.',
      'Quando cabível, pedir portabilidade e saber com quem os dados foram compartilhados.',
    ],
    highlight:
      'Esse conjunto de pedidos se chama DSAR (solicitação de acesso do titular). Não é um favor da empresa: é direito previsto na LGPD. O sistema precisa localizar, atualizar e responder com agilidade.',
    questions: [
      {
        id: 'q1',
        prompt: 'Qual opção representa um direito do titular previsto na LGPD?',
        options: [
          { id: 'a', label: 'Criar um novo banco de dados' },
          { id: 'b', label: 'Excluir regras internas da empresa' },
          { id: 'c', label: 'Alterar a senha de outro usuário' },
          { id: 'd', label: 'Pedir acesso aos próprios dados', correct: true },
        ],
        explanation:
          'O titular pode pedir acesso aos próprios dados. Criar bancos, mudar regras internas ou alterar senha de outra pessoa não são direitos do titular.',
      },
      {
        id: 'q2',
        prompt: 'A mensagem “Quero saber quais dados meus vocês armazenam” exerce qual direito?',
        options: [
          { id: 'a', label: 'Acesso aos dados', correct: true },
          { id: 'b', label: 'Correção' },
          { id: 'c', label: 'Portabilidade' },
          { id: 'd', label: 'Eliminação imediata de tudo' },
        ],
        explanation:
          'Pedir para ver quais dados estão guardados é o direito de acesso.',
      },
      {
        id: 'q3',
        prompt: 'O que muda no desenvolvimento quando o titular pode pedir acesso, correção ou exclusão?',
        options: [
          { id: 'a', label: 'Nada muda: basta guardar os dados' },
          {
            id: 'b',
            label: 'O sistema precisa localizar, atualizar e registrar solicitações',
            correct: true,
          },
          { id: 'c', label: 'Só o jurídico precisa responder, sem apoio do sistema' },
          { id: 'd', label: 'Todo pedido exige apagar o banco inteiro' },
        ],
        explanation:
          'A aplicação precisa facilitar localização, revisão e resposta. Nem todo pedido é exclusão total.',
      },
    ],
  },
  {
    id: 'tecnicas',
    title: 'Anonimização e pseudonimização',
    subtitle:
      'São técnicas diferentes. A escolha depende do uso futuro do dado e do objetivo do tratamento.',
    bullets: [
      'Anonimização: remove o vínculo identificável. Em geral é irreversível.',
      'Pseudonimização: troca identificadores por um código, mas ainda permite relacionar o registro à pessoa em ambiente controlado.',
      'Se o sistema ainda precisa atender o titular, pseudonimização costuma fazer mais sentido.',
      'Se o objetivo é estatística sem identificar pessoas, anonimização pode ser a melhor opção.',
    ],
    highlight:
      'Anonimização e pseudonimização não são a mesma coisa. Atender o titular também exige uma decisão técnica sobre o tratamento dos dados.',
    questions: [
      {
        id: 'q4',
        prompt:
          'Quando o sistema troca nome e CPF por um código interno, mas ainda consegue relacionar esse código à pessoa em ambiente controlado, qual técnica está sendo usada?',
        options: [
          { id: 'a', label: 'Compartilhamento' },
          { id: 'b', label: 'Pseudonimização', correct: true },
          { id: 'c', label: 'Eliminação total' },
          { id: 'd', label: 'Portabilidade' },
        ],
        explanation:
          'Há um código no lugar do identificador, mas o vínculo ainda existe de forma controlada: isso é pseudonimização.',
      },
      {
        id: 'q5',
        prompt: 'Qual frase descreve melhor a anonimização?',
        options: [
          { id: 'a', label: 'O dado continua ligado à pessoa, só que com senha' },
          {
            id: 'b',
            label: 'O dado deixa de permitir identificar a pessoa de forma razoável',
            correct: true,
          },
          { id: 'c', label: 'É o mesmo que criptografar e-mail' },
          { id: 'd', label: 'É só esconder o nome na tela' },
        ],
        explanation:
          'Na anonimização, o vínculo identificável é removido. Não basta “esconder” o nome na interface.',
      },
    ],
  },
  {
    id: 'consentimento',
    title: 'Consentimento e aviso de privacidade',
    subtitle:
      'Um formulário não serve só para pedir dados. Ele também precisa explicar como esses dados serão tratados.',
    bullets: [
      'O sistema deve deixar clara a finalidade da coleta.',
      'Quando a base legal for o consentimento, a pessoa precisa entender com o que está concordando.',
      'O aviso de privacidade explica uso dos dados e direitos do titular.',
      'Textos vagos como “seus dados poderão ser usados” ou “Li e concordo” sem contexto não dão transparência suficiente.',
    ],
    highlight:
      'Consentimento e aviso de privacidade têm funções diferentes, mas trabalham juntos. Antes de enviar um formulário, pergunte: a pessoa consegue entender como seus dados serão tratados?',
    questions: [
      {
        id: 'q6',
        prompt:
          'Qual elemento ajuda mais diretamente o titular a entender como seus dados serão usados em um formulário?',
        options: [
          { id: 'a', label: 'Tamanho da fonte do título' },
          { id: 'b', label: 'Nome da empresa em destaque' },
          { id: 'c', label: 'Aviso de privacidade', correct: true },
          { id: 'd', label: 'Cor do botão de envio' },
        ],
        explanation:
          'O aviso de privacidade é o texto que explica o tratamento dos dados e os direitos do titular.',
      },
      {
        id: 'q7',
        prompt: 'No formulário da atividade, o que está mais incompleto?',
        options: [
          {
            id: 'a',
            label: 'Não há campos de e-mail e telefone',
          },
          {
            id: 'b',
            label:
              'O texto é vago, o checkbox não explica o consentimento e a política não está clara',
            correct: true,
          },
          { id: 'c', label: 'Falta o botão de enviar' },
          { id: 'd', label: 'Não há campo de nome' },
        ],
        explanation:
          'Os campos existem, mas a transparência falha: texto genérico, “Li e concordo” sem contexto e link “Política” pouco claro.',
      },
    ],
  },
]

export const formElements: FormElementAnalysis[] = [
  {
    id: 'texto',
    name: 'Texto pequeno: “Ao continuar, seus dados poderão ser usados pela plataforma.”',
    present: 'Sim',
    clear: 'Não',
    informs:
      'Só diz que os dados “poderão ser usados”, sem finalidade, prazo, compartilhamento ou direitos.',
    improve:
      'Explicar para que os dados serão usados (ex.: inscrição, comunicação da oficina), por quanto tempo e se haverá compartilhamento.',
  },
  {
    id: 'checkbox',
    name: 'Checkbox: “Li e concordo”',
    present: 'Sim',
    clear: 'Não',
    informs:
      'Sugere consentimento, mas não deixa claro com o que a pessoa concorda.',
    improve:
      'Trocar por algo como “Li e concordo com o aviso de privacidade”, com link direto para o texto completo.',
  },
  {
    id: 'politica',
    name: 'Link no rodapé: “Política”',
    present: 'Sim',
    clear: 'Não',
    informs:
      'Indica que existe algum documento, mas o nome é genérico e está longe do momento do consentimento.',
    improve:
      'Chamar de “Aviso de privacidade”, colocar perto do checkbox e listar direitos do titular (acesso, correção, exclusão).',
  },
  {
    id: 'campos',
    name: 'Campos do formulário (nome, e-mail, telefone, escola, curso, cidade)',
    present: 'Sim',
    clear: 'Parcialmente',
    informs:
      'Pedem dados de identificação e contato para a inscrição, mas não explicam por que cada campo é necessário.',
    improve:
      'Indicar a finalidade perto dos campos e evitar pedir dados sem necessidade clara para a inscrição.',
  },
]

export const concreteImprovements = [
  'Deixar explícita a finalidade: “Seus dados serão usados apenas para inscrição e comunicação sobre as oficinas.”',
  'Trocar “Li e concordo” por consentimento ligado ao aviso de privacidade, com link acessível.',
  'Expandir o aviso: finalidade, responsáveis, compartilhamento (se houver), prazo de guarda e direitos (acesso, correção, exclusão).',
]

export const improvementJustification =
  'Essas melhorias aumentam a transparência e tornam o consentimento mais informado, ajudando o titular a entender o tratamento e a exercer seus direitos previstos na LGPD.'
