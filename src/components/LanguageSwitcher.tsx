import { Languages } from 'lucide-react'
import type { AppLanguage } from '../i18n'
import { languageMeta } from '../i18n'

export function LanguageSwitcher({ value, onChange }: { value: AppLanguage; onChange: (language: AppLanguage) => void }) {
  return <label className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-900">
    <Languages size={17} aria-hidden="true" />
    <span className="sr-only">Interface language</span>
    <select value={value} onChange={e => onChange(e.target.value as AppLanguage)} className="bg-transparent text-sm outline-none" aria-label="Interface language">
      {(Object.keys(languageMeta) as AppLanguage[]).map(lang => <option key={lang} value={lang}>{languageMeta[lang].nativeLabel}</option>)}
    </select>
  </label>
}