import { useMemo, useState } from 'react'
import { concreteImprovements, formElements, lessons } from './lib/content'
import {
  buildReportText,
  scoreAnswers,
  type AnswerMap,
  type StudentInfo,
} from './lib/report'

type Step = 'inicio' | `aula-${number}` | 'atividade' | 'relatorio'

const TOTAL_STEPS = lessons.length + 3 // inicio + aulas + atividade + relatorio

export default function App() {
  const [stepIndex, setStepIndex] = useState(0)
  const [info, setInfo] = useState<StudentInfo>({ nome: '', turma: '' })
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [copied, setCopied] = useState(false)

  const step: Step =
    stepIndex === 0
      ? 'inicio'
      : stepIndex <= lessons.length
        ? `aula-${stepIndex - 1}`
        : stepIndex === lessons.length + 1
          ? 'atividade'
          : 'relatorio'

  const lesson =
    step.startsWith('aula-') ? lessons[Number(step.split('-')[1])] : null

  const progress = Math.round((stepIndex / (TOTAL_STEPS - 1)) * 100)
  const score = useMemo(() => scoreAnswers(answers), [answers])
  const report = useMemo(() => buildReportText(info, answers), [info, answers])

  function setAnswer(questionId: string, optionId: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  function canAdvance() {
    if (step === 'inicio') return info.nome.trim().length > 1
    if (lesson) return lesson.questions.every((q) => Boolean(answers[q.id]))
    if (step === 'atividade') return true
    return true
  }

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(report)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      const area = document.getElementById('report-text') as HTMLTextAreaElement | null
      area?.select()
      document.execCommand('copy')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }
  }

  function downloadReport() {
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `relatorio-lgpd-${(info.nome || 'aluno').replace(/\s+/g, '-').toLowerCase()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-6">
        <p className="text-sm font-semibold tracking-[0.14em] text-[var(--sea)] uppercase">
          LGPD no Desenvolvimento
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--paper-2)]">
          <div
            className="h-full rounded-full bg-[var(--sea)] transition-all duration-500"
            style={{ width: `${progress}%` }}
            aria-hidden
          />
        </div>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Etapa {stepIndex + 1} de {TOTAL_STEPS}
        </p>
      </header>

      <main className="flex-1">
        {step === 'inicio' && (
          <section className="animate-in">
            <h1 className="text-4xl leading-tight sm:text-5xl">
              Aprenda LGPD de forma simples
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[var(--ink-soft)]">
              Em poucos passos você vai entender direitos do titular,
              anonimização, pseudonimização, consentimento e aviso de
              privacidade — e responder perguntas para fixar o conteúdo.
            </p>

            <div className="mt-8 space-y-4 rounded-2xl border border-[var(--line)] bg-white/80 p-5 shadow-[var(--shadow)]">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Seu nome</span>
                <input
                  value={info.nome}
                  onChange={(e) => setInfo((s) => ({ ...s, nome: e.target.value }))}
                  placeholder="Nome completo"
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 outline-none focus:border-[var(--sea)]"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Turma</span>
                <input
                  value={info.turma}
                  onChange={(e) => setInfo((s) => ({ ...s, turma: e.target.value }))}
                  placeholder="Ex.: 2º DS"
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 outline-none focus:border-[var(--sea)]"
                />
              </label>
            </div>
          </section>
        )}

        {lesson && (
          <section className="animate-in">
            <p className="text-sm font-semibold text-[var(--coral)]">
              Conceito {stepIndex} de {lessons.length}
            </p>
            <h1 className="mt-2 text-3xl leading-tight sm:text-4xl">{lesson.title}</h1>
            <p className="mt-3 text-lg text-[var(--ink-soft)]">{lesson.subtitle}</p>

            <ul className="mt-6 space-y-3">
              {lesson.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="rounded-xl border border-[var(--line)] bg-white/75 px-4 py-3 text-[var(--ink)]"
                >
                  {bullet}
                </li>
              ))}
            </ul>

            <p className="mt-5 rounded-xl border-l-4 border-[var(--sand)] bg-[#fff8ef] px-4 py-3 text-[var(--ink)]">
              {lesson.highlight}
            </p>

            <h2 className="mt-10 text-2xl">Teste rápido</h2>
            <p className="mt-1 text-[var(--ink-soft)]">
              Responda para seguir. Depois você verá a explicação.
            </p>

            <div className="mt-5 space-y-6">
              {lesson.questions.map((question, index) => {
                const selected = answers[question.id]
                const correctId = question.options.find((o) => o.correct)?.id
                const answered = Boolean(selected)

                return (
                  <div
                    key={question.id}
                    className="rounded-2xl border border-[var(--line)] bg-white/85 p-5 shadow-[var(--shadow)]"
                  >
                    <p className="font-medium">
                      {index + 1}. {question.prompt}
                    </p>
                    <div className="mt-4 space-y-2">
                      {question.options.map((option) => {
                        const isSelected = selected === option.id
                        let style =
                          'border-[var(--line)] bg-[var(--paper)] hover:border-[var(--sea)]'
                        if (answered && option.id === correctId) {
                          style = 'border-[var(--ok)] bg-[#e8f7ee]'
                        } else if (answered && isSelected && option.id !== correctId) {
                          style = 'border-[var(--bad)] bg-[#fdeceb]'
                        } else if (isSelected) {
                          style = 'border-[var(--sea)] bg-[#e7f4f3]'
                        }

                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setAnswer(question.id, option.id)}
                            className={`block w-full rounded-xl border px-4 py-3 text-left transition ${style}`}
                          >
                            {option.label}
                          </button>
                        )
                      })}
                    </div>
                    {answered && (
                      <p className="mt-3 text-sm text-[var(--ink-soft)]">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {step === 'atividade' && (
          <section className="animate-in">
            <p className="text-sm font-semibold text-[var(--coral)]">Atividade prática</p>
            <h1 className="mt-2 text-3xl leading-tight sm:text-4xl">
              Análise de um cadastro com a LGPD
            </h1>
            <p className="mt-3 text-lg text-[var(--ink-soft)]">
              Situação: plataforma de inscrição para oficinas técnicas. Veja o
              formulário e compare com uma versão mais transparente. No
              relatório final, as respostas do roteiro já virão preenchidas com
              base no que você estudou.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-[#e3b4ac] bg-[#fff5f2] p-5">
                <h2 className="text-xl text-[var(--bad)]">Formulário atual (vago)</h2>
                <ul className="mt-3 space-y-1 text-sm text-[var(--ink-soft)]">
                  <li>Campos: nome, e-mail, telefone, escola, curso, cidade</li>
                  <li>Texto: “Ao continuar, seus dados poderão ser usados…”</li>
                  <li>Checkbox: “Li e concordo”</li>
                  <li>Link: “Política”</li>
                  <li>Botão: Enviar inscrição</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-[#9dceb2] bg-[#f2fbf5] p-5">
                <h2 className="text-xl text-[var(--ok)]">Versão mais adequada</h2>
                <ul className="mt-3 space-y-1 text-sm text-[var(--ink-soft)]">
                  <li>Finalidade clara: inscrição e comunicação da oficina</li>
                  <li>Aviso de privacidade com direitos do titular</li>
                  <li>Checkbox: “Li e concordo com o aviso de privacidade”</li>
                  <li>Link próximo ao consentimento</li>
                  <li>Pedido só do necessário</li>
                </ul>
              </article>
            </div>

            <div className="mt-6 space-y-4">
              {formElements.map((el) => (
                <article
                  key={el.id}
                  className="rounded-2xl border border-[var(--line)] bg-white/85 p-5"
                >
                  <h3 className="text-lg">{el.name}</h3>
                  <p className="mt-2 text-sm">
                    <strong>Presente?</strong> {el.present} · <strong>Claro?</strong>{' '}
                    {el.clear}
                  </p>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">{el.informs}</p>
                  <p className="mt-2 text-sm">
                    <strong>Melhorar:</strong> {el.improve}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--line)] bg-white/85 p-5">
              <h2 className="text-xl">3 melhorias concretas</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--ink-soft)]">
                {concreteImprovements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {step === 'relatorio' && (
          <section className="animate-in">
            <h1 className="text-3xl leading-tight sm:text-4xl">Seu relatório</h1>
            <p className="mt-3 text-lg text-[var(--ink-soft)]">
              Desempenho, respostas do quiz e o roteiro da atividade prontos para
              copiar ou baixar em TXT.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-4 text-center">
                <p className="text-sm text-[var(--ink-soft)]">Acertos</p>
                <p className="mt-1 text-3xl font-semibold text-[var(--sea-deep)]">
                  {score.acertos}/{score.total}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-4 text-center">
                <p className="text-sm text-[var(--ink-soft)]">Desempenho</p>
                <p className="mt-1 text-3xl font-semibold text-[var(--sea-deep)]">
                  {score.percentual}%
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-4 text-center">
                <p className="text-sm text-[var(--ink-soft)]">Aluno</p>
                <p className="mt-1 truncate text-lg font-semibold text-[var(--sea-deep)]">
                  {info.nome || '—'}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyReport}
                className="rounded-xl bg-[var(--sea)] px-5 py-3 font-medium text-white hover:bg-[var(--sea-deep)]"
              >
                {copied ? 'Copiado!' : 'Copiar relatório (TXT)'}
              </button>
              <button
                type="button"
                onClick={downloadReport}
                className="rounded-xl border border-[var(--sea)] px-5 py-3 font-medium text-[var(--sea)] hover:bg-[#e7f4f3]"
              >
                Baixar .txt
              </button>
            </div>

            <textarea
              id="report-text"
              readOnly
              value={report}
              className="mt-5 h-[28rem] w-full resize-y rounded-2xl border border-[var(--line)] bg-[#0f2a30] p-4 font-mono text-sm leading-relaxed text-[#e7f4f3]"
            />
          </section>
        )}
      </main>

      <footer className="mt-8 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-5">
        <button
          type="button"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((s) => Math.max(0, s - 1))}
          className="rounded-xl border border-[var(--line)] px-4 py-2.5 disabled:opacity-40"
        >
          Voltar
        </button>

        {step !== 'relatorio' ? (
          <button
            type="button"
            disabled={!canAdvance()}
            onClick={() => setStepIndex((s) => Math.min(TOTAL_STEPS - 1, s + 1))}
            className="rounded-xl bg-[var(--coral)] px-5 py-2.5 font-medium text-white disabled:opacity-40"
          >
            Continuar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setStepIndex(0)
              setAnswers({})
              setCopied(false)
            }}
            className="rounded-xl border border-[var(--line)] px-4 py-2.5"
          >
            Recomeçar
          </button>
        )}
      </footer>
    </div>
  )
}
