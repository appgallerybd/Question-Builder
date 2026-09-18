import { FileText, Languages, ShieldCheck, Sparkles } from 'lucide-react'
import { useState } from 'react'

const languages = ['বাংলা', 'English', 'العربية', 'اردو']

export default function App() {
  const [language, setLanguage] = useState('বাংলা')
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-white text-slate-950"><FileText size={21}/></div>
            <div><h1 className="font-semibold tracking-tight">Question Builder</h1><p className="text-xs text-slate-400">Multilingual Question Paper Generator</p></div>
          </div>
          <select aria-label="Language" value={language} onChange={e => setLanguage(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
            {languages.map(item => <option key={item}>{item}</option>)}
          </select>
        </div>
      </header>
      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"><Sparkles size={14}/> Foundation ready</div>
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">বাংলা, English, العربية ও اردو — এক জায়গায় প্রশ্নপত্র তৈরি করুন।</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">A production-ready foundation for multilingual question authoring, RTL/LTR layout, live preview, PDF and DOCX export.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {languages.map(item => <div key={item} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center text-sm">{item}</div>)}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
          <div className="flex items-center gap-3"><Languages/><div><h3 className="font-semibold">Foundation modules</h3><p className="text-sm text-slate-400">Ready for the next implementation phases.</p></div></div>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            <li>✓ React + Vite + TypeScript</li><li>✓ Tailwind CSS v4</li><li>✓ Zustand / scalable state architecture</li><li>✓ DOCX/PDF generation dependencies</li><li>✓ RTL/LTR-ready application shell</li><li>✓ Strict TypeScript foundation</li>
          </ul>
          <div className="mt-6 flex items-center gap-2 text-xs text-emerald-400"><ShieldCheck size={15}/> No placeholder export buttons in the final build.</div>
        </div>
      </section>
    </main>
  )
}