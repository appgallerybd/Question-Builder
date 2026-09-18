import { useMemo, useState } from 'react'
import { Copy, Edit3, Plus, Search, Trash2, X, ImagePlus, Table2 } from 'lucide-react'
import { useAppStore } from '../stores/appStore'
import type { Language, Question, QuestionType } from '../types'
import { createId } from '../utils/ids'
import { questionSchema } from '../validation/questionSchema'
import { getTranslation } from '../i18n'

const typeLabels: Record<QuestionType, string> = {
  mcq: 'MCQ',
  'multiple-select': 'Multiple Select',
  short: 'Short Question',
  broad: 'Broad Question',
  creative: 'Creative Question',
  'fill-blank': 'Fill in the Blank',
  'true-false': 'True / False',
  matching: 'Matching',
  descriptive: 'Descriptive',
  custom: 'Custom',
}

const langLabels: Record<Language, string> = {
  bn: 'বাংলা',
  en: 'English',
  ar: 'العربية',
  ur: 'اردو',
}

const empty = (language: Language): Question => {
  const now = new Date().toISOString()
  return {
    id: createId('q'),
    language,
    direction: language === 'ar' || language === 'ur' ? 'rtl' : 'ltr',
    questionText: '',
    questionType: 'short',
    subject: '',
    chapter: '',
    topic: '',
    className: '',
    difficulty: 'medium',
    marks: 1,
    tags: [],
    createdAt: now,
    updatedAt: now,
  }
}

export function QuestionBank() {
  const questions = useAppStore((s) => s.questions)
  const add = useAppStore((s) => s.addQuestion)
  const update = useAppStore((s) => s.updateQuestion)
  const del = useAppStore((s) => s.deleteQuestion)
  const language = useAppStore((s) => s.language)

  const [query, setQuery] = useState('')
  const [lang, setLang] = useState<Language | 'all'>('all')
  const [type, setType] = useState<QuestionType | 'all'>('all')
  const [difficulty, setDifficulty] = useState<Question['difficulty'] | 'all'>('all')
  const [editing, setEditing] = useState<Question | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [sort, setSort] = useState<'newest' | 'oldest' | 'marks'>('newest')

  const filtered = useMemo(() => {
    const q = query.toLocaleLowerCase()
    return questions
      .filter(
        (item) =>
          (!q ||
            item.questionText.toLocaleLowerCase().includes(q) ||
            item.subject.toLocaleLowerCase().includes(q)) &&
          (lang === 'all' || item.language === lang) &&
          (type === 'all' || item.questionType === type) &&
          (difficulty === 'all' || item.difficulty === difficulty),
      )
      .sort((a, b) => {
        if (sort === 'marks') return b.marks - a.marks
        return sort === 'oldest'
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt)
      })
  }, [questions, query, lang, type, difficulty, sort])

  const t = (k: Parameters<typeof getTranslation>[1]) => getTranslation(language, k)

  const save = (q: Question) => {
    const parsed = questionSchema.safeParse(q)
    if (!parsed.success) {
      window.alert(parsed.error.issues[0]?.message ?? 'Invalid question')
      return
    }
    if (editing && questions.some((x) => x.id === q.id)) update(q)
    else add(q)
    setEditing(null)
  }

  const duplicate = (q: Question) =>
    add({
      ...q,
      id: createId('q'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

  const bulkDelete = () => {
    if (!window.confirm('Delete selected questions?')) return
    selected.forEach(del)
    setSelected([])
  }

  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
        <div>
          <h2 className="text-lg font-semibold">{t('questionBank')}</h2>
          <p className="text-sm text-slate-500">
            {filtered.length} / {questions.length}
          </p>
        </div>
        <button
          onClick={() => setEditing(empty(language))}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-950"
        >
          <Plus size={18} />
          {t('addQuestion')}
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900"><div className="grid gap-2 md:grid-cols-[1fr_160px_180px_150px] lg:grid-cols-[1fr_150px_170px_130px_150px]">
        <label className="relative">
          <Search className="absolute left-3 top-3.5 text-slate-400" size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search')}
            className="min-h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-950"
          />
        </label>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as Language | 'all')}
          className="min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="all">All languages</option>
          {Object.entries(langLabels).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as QuestionType | 'all')}
          className="min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="all">All types</option>
          {Object.entries(typeLabels).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="marks">Marks</option>
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Question['difficulty'] | 'all')}
          className="min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="all">All difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {selected.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-900">
          <span>{selected.length} selected</span>
          <button onClick={bulkDelete} className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-red-600">
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {filtered.map((q) => (
          <div key={q.id} className="border-b border-slate-100 px-4 py-3 last:border-0 hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-slate-950/40">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={selected.includes(q.id)}
                onChange={(e) =>
                  setSelected((ids) =>
                    e.target.checked ? [...ids, q.id] : ids.filter((id) => id !== q.id),
                  )
                }
                className="mt-1 size-4"
              />
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap gap-1 text-[10px]">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{langLabels[q.language]}</span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{typeLabels[q.questionType]}</span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{q.marks} marks</span>
                </div>
                <p dir={q.direction} lang={q.language} className="bidi-isolate text-sm leading-6">
                  {q.questionText}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {q.subject || '—'} · {q.className || '—'}
                </p>
              </div>
              <div className="flex gap-1">
                <button aria-label="Edit" onClick={() => setEditing(q)} className="grid size-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Edit3 size={16} />
                </button>
                <button aria-label="Duplicate" onClick={() => duplicate(q)} className="grid size-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Copy size={16} />
                </button>
                <button aria-label="Delete" onClick={() => del(q.id)} className="grid size-9 place-items-center rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="p-12 text-center text-sm text-slate-500">{t('noQuestions')}</div>}
      </div>

      {editing && <QuestionEditor value={editing} onCancel={() => setEditing(null)} onSave={save} />}
    </section>
  )
}

function QuestionEditor({
  value,
  onCancel,
  onSave,
}: {
  value: Question
  onCancel: () => void
  onSave: (q: Question) => void
}) {
  const [q, setQ] = useState(value)
  const [tag, setTag] = useState('')

  const set = (patch: Partial<Question>) =>
    setQ((x) => ({ ...x, ...patch, updatedAt: new Date().toISOString() }))

  const updateSub = (id: string, patch: Partial<NonNullable<Question['subQuestions']>[number]>) => {
    set({
      subQuestions: (q.subQuestions ?? []).map((item) => (item.id === id ? { ...item, ...patch } : item)),
    })
  }

  const updateTableCell = (rowIndex: number, colIndex: number, value: string) => {
    if (!q.table) return
    const rows = q.table.rows.map((row, ri) =>
      ri === rowIndex ? row.map((cell, ci) => (ci === colIndex ? value : cell)) : row,
    )
    set({ table: { ...q.table, rows } })
  }

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/50 p-3 backdrop-blur-[2px]">
      <div className="max-h-[94vh] w-full max-w-4xl overflow-auto rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-semibold">{value.questionText ? 'Edit Question' : 'Add Question'}</h3>
          <button onClick={onCancel} className="grid size-10 place-items-center rounded-xl">
            <X size={20} />
          </button>
        </div>

        <div className="px-5 py-5"><div className="mb-5 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 text-xs font-medium text-slate-500 dark:border-slate-800"><span className="border-b-2 border-slate-900 pb-3 text-slate-900 dark:border-white dark:text-white">Content</span><span className="pb-3">Structure</span><span className="pb-3">Media & Table</span></div><div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            Language
            <select
              value={q.language}
              onChange={(e) => {
                const l = e.target.value as Language
                set({ language: l, direction: l === 'ar' || l === 'ur' ? 'rtl' : 'ltr' })
              }}
              className="mt-1 min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-950"
            >
              <option value="bn">বাংলা</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="ur">اردو</option>
            </select>
          </label>

          <label className="text-sm">
            Question Type
            <select
              value={q.questionType}
              onChange={(e) => set({ questionType: e.target.value as QuestionType })}
              className="mt-1 min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-950"
            >
              {Object.entries(typeLabels).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            Chapter
            <input value={q.chapter} onChange={(e) => set({ chapter: e.target.value })} className="mt-1 min-h-11 w-full rounded-xl border p-2 dark:bg-slate-950" />
          </label>

          <label className="text-sm">
            Topic
            <input value={q.topic} onChange={(e) => set({ topic: e.target.value })} className="mt-1 min-h-11 w-full rounded-xl border p-2 dark:bg-slate-950" />
          </label>

          <label className="text-sm sm:col-span-2">
            Question Text
            <textarea
              value={q.questionText}
              dir={q.direction}
              onChange={(e) => set({ questionText: e.target.value })}
              rows={5}
              className="mt-1 min-h-32 w-full resize-y rounded-lg border border-slate-200 bg-white p-3 text-sm leading-7 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-950"
              autoFocus
            />
          </label>

          <label className="text-sm">
            Subject
            <input value={q.subject} onChange={(e) => set({ subject: e.target.value })} className="mt-1 min-h-11 w-full rounded-xl border p-2 dark:bg-slate-950" />
          </label>

          <label className="text-sm">
            Class
            <input value={q.className} onChange={(e) => set({ className: e.target.value })} className="mt-1 min-h-11 w-full rounded-xl border p-2 dark:bg-slate-950" />
          </label>

          <label className="text-sm">
            Marks
            <input type="number" min="0" max="1000" value={q.marks} onChange={(e) => set({ marks: Number(e.target.value) })} className="mt-1 min-h-11 w-full rounded-xl border p-2 dark:bg-slate-950" />
          </label>

          <label className="text-sm">
            Difficulty
            <select value={q.difficulty} onChange={(e) => set({ difficulty: e.target.value as Question['difficulty'] })} className="mt-1 min-h-11 w-full rounded-xl border p-2 dark:bg-slate-950">
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </label>
        </div>

        <div className="mt-5">
          <label className="text-sm">
            Tags
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && tag.trim()) {
                  e.preventDefault()
                  set({ tags: [...q.tags, tag.trim()] })
                  setTag('')
                }
              }}
              placeholder="Type a tag and press Enter"
              className="mt-1 min-h-11 w-full rounded-xl border p-2 dark:bg-slate-950"
            />
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {q.tags.map((x, i) => (
              <button
                type="button"
                key={`${x}-${i}`}
                onClick={() => set({ tags: q.tags.filter((_, j) => j !== i) })}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800"
              >
                {x} ×
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 px-5 py-5 dark:border-slate-800"><div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Structure & Media</div><div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                set({
                  subQuestions: [
                    ...(q.subQuestions ?? []),
                    {
                      id: createId('sub'),
                      label: String.fromCharCode(0x0995 + (q.subQuestions?.length ?? 0)),
                      text: '',
                      marks: 1,
                    },
                  ],
                })
              }
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm"
            >
              <Plus size={15} />
              Sub-question
            </button>

            <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm">
              <ImagePlus size={15} />
              Image
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  if (file.size > 3 * 1024 * 1024) {
                    window.alert('Image must be 3 MB or smaller')
                    return
                  }
                  const reader = new FileReader()
                  reader.onload = () =>
                    set({
                      media: [
                        ...(q.media ?? []),
                        {
                          id: createId('img'),
                          dataUrl: String(reader.result),
                          alt: file.name,
                          width: 100,
                          align: 'center',
                        },
                      ],
                    })
                  reader.readAsDataURL(file)
                }}
              />
            </label>

            <button
              type="button"
              onClick={() =>
                set({
                  table:
                    q.table ?? {
                      id: createId('table'),
                      rows: [
                        ['', ''],
                        ['', ''],
                      ],
                      hasHeader: true,
                      direction: q.direction,
                    },
                })
              }
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm"
            >
              <Table2 size={15} />
              Table
            </button>
          </div>

          {q.subQuestions?.map((s) => (
            <div key={s.id} className="grid gap-2 sm:grid-cols-[70px_1fr_90px_auto]">
              <input
                value={s.label}
                onChange={(e) => updateSub(s.id, { label: e.target.value })}
                className="min-h-11 rounded-lg border p-2"
              />
              <input
                value={s.text}
                onChange={(e) => updateSub(s.id, { text: e.target.value })}
                dir={q.direction}
                placeholder="Sub-question"
                className="min-h-11 rounded-lg border p-2"
              />
              <input
                type="number"
                min="0"
                value={s.marks}
                onChange={(e) => updateSub(s.id, { marks: Number(e.target.value) })}
                className="min-h-11 rounded-lg border p-2"
              />
              <button
                type="button"
                onClick={() => set({ subQuestions: (q.subQuestions ?? []).filter((item) => item.id !== s.id) })}
                className="grid size-9 place-items-center rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}

          {q.media?.map((m) => (
            <div key={m.id} className="flex items-center gap-3 rounded-lg border p-2">
              <img src={m.dataUrl} alt={m.alt} className="h-16 w-24 object-contain" />
              <input
                type="range"
                min="25"
                max="100"
                value={m.width}
                onChange={(e) =>
                  set({
                    media: (q.media ?? []).map((item) =>
                      item.id === m.id ? { ...item, width: Number(e.target.value) } : item,
                    ),
                  })
                }
              />
              <button
                type="button"
                onClick={() => set({ media: (q.media ?? []).filter((item) => item.id !== m.id) })}
                className="text-red-600"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}

          {q.table && (
            <div className="overflow-auto rounded-lg border">
              <table className="w-full text-sm">
                <tbody>
                  {q.table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="border p-1">
                          <input
                            value={cell}
                            onChange={(e) => updateTableCell(rowIndex, colIndex, e.target.value)}
                            dir={q.table?.direction}
                            className="min-w-24 w-full p-2 outline-none"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-2 p-2">
                <button
                  type="button"
                  onClick={() =>
                    set({
                      table: {
                        ...q.table!,
                        rows: [...q.table!.rows, new Array(q.table!.rows[0]?.length || 2).fill('')],
                      },
                    })
                  }
                  className="text-xs underline"
                >
                  + row
                </button>
                <button
                  type="button"
                  onClick={() =>
                    set({
                      table: {
                        ...q.table!,
                        rows: q.table!.rows.map((row) => [...row, '']),
                      },
                    })
                  }
                  className="text-xs underline"
                >
                  + column
                </button>
                <button type="button" onClick={() => set({ table: undefined })} className="text-xs text-red-600">
                  Remove table
                </button>
              </div>
            </div>
          )}
        </div>

        {(q.questionType === 'mcq' || q.questionType === 'multiple-select') && (
          <div className="border-t border-slate-200 px-5 py-5 dark:border-slate-800"><p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Answer Options</p><div className="space-y-2">
            <p className="text-sm font-medium">Options</p>
            {(q.options ?? []).map((o, i) => (
              <input
                key={o.id}
                value={o.text}
                onChange={(e) =>
                  set({
                    options: (q.options ?? []).map((item) =>
                      item.id === o.id ? { ...item, text: e.target.value } : item,
                    ),
                  })
                }
                placeholder={String.fromCharCode(65 + i)}
                className="min-h-11 w-full rounded-xl border p-2 dark:bg-slate-950"
              />
            ))}
            <button
              type="button"
              onClick={() => set({ options: [...(q.options ?? []), { id: createId('opt'), text: '' }] })}
              className="text-sm underline"
            >
              + Add option
            </button>
          </div>
        </div>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onCancel} className="min-h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium dark:border-slate-700 dark:bg-slate-900">
            Cancel
          </button>
          <button
            onClick={() => onSave(q)}
            className="min-h-10 rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-950"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
