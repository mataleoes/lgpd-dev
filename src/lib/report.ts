import {
  concreteImprovements,
  formElements,
  improvementJustification,
  lessons,
  type Lesson,
} from './content'

export type AnswerMap = Record<string, string>

export type StudentInfo = {
  nome: string
  turma: string
}

export function isCorrect(lesson: Lesson, questionId: string, answerId?: string) {
  const question = lesson.questions.find((q) => q.id === questionId)
  if (!question || !answerId) return false
  return question.options.some((o) => o.id === answerId && o.correct)
}

export function scoreAnswers(answers: AnswerMap) {
  const all = lessons.flatMap((lesson) =>
    lesson.questions.map((question) => ({
      lesson,
      question,
      answerId: answers[question.id],
      correct: isCorrect(lesson, question.id, answers[question.id]),
    })),
  )

  const total = all.length
  const acertos = all.filter((item) => item.correct).length
  const percentual = total === 0 ? 0 : Math.round((acertos / total) * 100)

  return { total, acertos, percentual, items: all }
}

export function buildReportText(info: StudentInfo, answers: AnswerMap) {
  const { total, acertos, percentual, items } = scoreAnswers(answers)
  const agora = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })

  const linhas: string[] = [
    'RELATÓRIO — LGPD NO DESENVOLVIMENTO',
    '====================================',
    `Data/hora (America/Sao_Paulo): ${agora}`,
    `Nome: ${info.nome || '(não informado)'}`,
    `Turma: ${info.turma || '(não informada)'}`,
    '',
    'DESEMPENHO NO QUIZ',
    '------------------',
    `Acertos: ${acertos} de ${total} (${percentual}%)`,
    '',
  ]

  for (const item of items) {
    const escolhida = item.question.options.find((o) => o.id === item.answerId)
    const correta = item.question.options.find((o) => o.correct)
    linhas.push(`Pergunta: ${item.question.prompt}`)
    linhas.push(`Sua resposta: ${escolhida?.label ?? '(sem resposta)'}`)
    linhas.push(`Resultado: ${item.correct ? 'CORRETA' : 'INCORRETA'}`)
    if (!item.correct) {
      linhas.push(`Resposta correta: ${correta?.label ?? ''}`)
    }
    linhas.push(`Explicação: ${item.question.explanation}`)
    linhas.push('')
  }

  linhas.push('O QUE VOCÊ APRENDEU')
  linhas.push('-------------------')
  linhas.push(
    '1. O titular tem direitos (acesso, correção, e em certos casos anonimização/bloqueio/eliminação) e o sistema precisa facilitar o atendimento desses pedidos (DSAR).',
  )
  linhas.push(
    '2. Anonimização remove o vínculo identificável; pseudonimização reduz o vínculo, mas ainda permite relação controlada com a pessoa.',
  )
  linhas.push(
    '3. Formulários precisam de transparência: finalidade clara, aviso de privacidade e consentimento compreensível.',
  )
  linhas.push('')

  linhas.push('ROTEIRO DA ATIVIDADE PRÁTICA')
  linhas.push('Análise de conformidade de um cadastro com a LGPD')
  linhas.push('-------------------------------------------------')
  linhas.push(
    'Formulário analisado: nome, e-mail, telefone, escola, curso de interesse, cidade; texto vago; checkbox “Li e concordo”; link “Política”; botão enviar.',
  )
  linhas.push('')

  for (const el of formElements) {
    linhas.push(`Elemento analisado: ${el.name}`)
    linhas.push(`Está presente? ${el.present}`)
    linhas.push(`Está claro para o titular? ${el.clear}`)
    linhas.push(`O que esse elemento informa? ${el.informs}`)
    linhas.push(`O que precisa melhorar? ${el.improve}`)
    linhas.push('')
  }

  linhas.push('Melhorias concretas:')
  concreteImprovements.forEach((item, index) => {
    linhas.push(`${index + 1}. ${item}`)
  })
  linhas.push('')
  linhas.push(`Justificativa: ${improvementJustification}`)
  linhas.push('')
  linhas.push('Fim do relatório.')

  return linhas.join('\n')
}
