import { useState } from 'react'
import {
  Archive, BookOpen, FilePlus2, FileText, LayoutDashboard, Menu, Moon, PanelLeft,
  Settings, Sun, X, ChevronRight, Search, Languages, Sparkles
} from 'lucide-react'

type Page = 'dashboard' | 'create' | 'questions' | 'papers' | 'settings'
type Theme = 'light' | 'dark' | 'system'

const nav = [
  { id: 'dashboard' as Page, label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
  { id: 'create' as Page, label: 'প্রশ্নপত্র তৈরি', icon: FilePlus2 },
  { id: 'questions' as Page, label: 'প্রশ্ন ব্যাংক', icon: BookOpen },
  { id: 'papers' as Page, label: 'সংরক্ষিত পেপার', icon: Archive },
  { id: 'settings' as Page, label: 'সেটিংস', icon: Settings },
]

const pageCopy: Record<Page, { title: string; subtitle: string }> = {
  dashboard: { title: 'ড্যাশবোর্ড', subtitle: 'আপনার প্রশ্নপত্র তৈরির কাজ এক নজরে দেখুন।' },
  create: { title: 'প্রশ্নপত্র তৈরি করুন', subtitle: 'ধাপে ধাপে একটি professional question paper তৈরি করুন।' },
  questions: { title: 'প্রশ্ন ব্যাংক', subtitle: 'প্রশ্ন সংরক্ষণ, খোঁজা ও পরিচালনা করুন।' },
  papers: { title: 'সংরক্ষিত পেপার', subtitle: 'Draft ও final question papers পরিচালনা করুন।' },
  settings: { title: 'সেটিংস', subtitle: 'অ্যাপ, typography ও appearance কনফিগার করুন।' },
}

function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const [theme, setTheme] = useState<Theme>('light')
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigate = (next: Page) => { setPage(next); setMobileOpen(false) }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex lg:flex-col">
          <Sidebar page={page} navigate={navigate} />
        </aside>

        {mobileOpen && <div className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={() => setMobileOpen(false)} />}
        <aside className={`fixed inset-y-0 left-0 z-50 w-[min(86vw,320px)] border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-900 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
            <Brand compact />
            <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="grid size-10 place-items-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"><X size={20}/></button>
          </div>
          <Sidebar page={page} navigate={navigate} />
        </aside>

        <div className="lg:pl-64">
          <header className="sticky top-0 z-30 h-16 border-b border-slate-200/90 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="grid size-10 place-items-center rounded-xl border border-slate-200 lg:hidden dark:border-slate-800"><Menu size={20}/></button>
                <div className="min-w-0"><h1 className="truncate text-lg font-semibold">{pageCopy[page].title}</h1><p className="hidden truncate text-xs text-slate-500 sm:block dark:text-slate-400">{pageCopy[page].subtitle}</p></div>
              </div>
              <div className="flex items-center gap-2">
                <button aria-label="Search" className="grid size-10 place-items-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"><Search size={19}/></button>
                <button aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="grid size-10 place-items-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">{theme === 'dark' ? <Sun size={19}/> : <Moon size={19}/>}</button>
              </div>
            </div>
          </header>

          <main className="min-h-[calc(100vh-64px)] pb-24 lg:pb-8">
            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
              {page === 'dashboard' && <Dashboard navigate={navigate} />}
              {page === 'create' && <CreatePage />}
              {page === 'questions' && <EmptyPage icon={BookOpen} title="কোনো প্রশ্ন এখনো নেই" action="প্রশ্ন যোগ করুন" />}
              {page === 'papers' && <EmptyPage icon={FileText} title="কোনো সংরক্ষিত পেপার নেই" action="নতুন পেপার তৈরি করুন" />}
              {page === 'settings' && <SettingsPage theme={theme} setTheme={setTheme} />}
            </div>
          </main>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 lg:hidden">
          <div className="mx-auto grid max-w-lg grid-cols-4">
            {nav.slice(0,4).map(item => { const Icon=item.icon; return <button key={item.id} onClick={() => navigate(item.id)} className={`flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl text-[11px] ${page===item.id?'bg-slate-100 font-semibold dark:bg-slate-800':'text-slate-500'}`}><Icon size={18}/><span>{item.id==='create'?'তৈরি':item.label.replace('ড্যাশবোর্ড','হোম').replace('প্রশ্ন ব্যাংক','প্রশ্ন').replace('সংরক্ষিত পেপার','পেপার')}</span></button> })}</div>
        </nav>
      </div>
    </div>
  )
}

function Brand({ compact=false }: {compact?: boolean}) {
  return <div className="flex items-center gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950"><FileText size={20}/></div>{!compact && <div><div className="font-semibold">Question Builder</div><div className="text-[11px] text-slate-500 dark:text-slate-400">Multilingual Generator</div></div>}</div>
}

function Sidebar({page,navigate}:{page:Page;navigate:(p:Page)=>void}) {
  return <div className="flex h-full flex-col px-3 py-4"><div className="px-2 pb-6"><Brand /></div><div className="space-y-1">{nav.map(item=>{const Icon=item.icon; return <button key={item.id} onClick={()=>navigate(item.id)} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm transition ${page===item.id?'bg-slate-950 font-medium text-white dark:bg-white dark:text-slate-950':'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}><Icon size={19}/><span>{item.label}</span>{page===item.id&&<ChevronRight className="ml-auto" size={16}/>}</button>})}</div><div className="mt-auto rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><Sparkles size={18}/><p className="mt-3 text-sm font-medium">Multilingual workflow</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">বাংলা · English · العربية · اردو</p></div></div>
}

function Dashboard({navigate}:{navigate:(p:Page)=>void}) {
  const stats=[['মোট প্রশ্ন','0'],['মোট পেপার','0'],['Draft','0'],['মোট বিষয়','0']]
  return <div className="space-y-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">স্বাগতম</p><h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">আজ কী তৈরি করবেন?</h2></div><button onClick={()=>navigate('create')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950"><FilePlus2 size={18}/> প্রশ্নপত্র তৈরি</button></div><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{stats.map(([label,value])=><div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><p className="text-xs text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>)}</div><div className="grid gap-4 md:grid-cols-3"><Action title="প্রশ্ন যোগ করুন" text="Question Bank-এ নতুন প্রশ্ন সংরক্ষণ করুন।" icon={BookOpen} onClick={()=>navigate('questions')}/><Action title="পেপার তৈরি করুন" text="Exam information থেকে শুরু করুন।" icon={FilePlus2} onClick={()=>navigate('create')}/><Action title="সেটিংস" text="Font, theme ও default options ঠিক করুন।" icon={Settings} onClick={()=>navigate('settings')}/></div><div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900"><Languages className="mx-auto" size={28}/><h3 className="mt-3 font-semibold">চার ভাষার জন্য প্রস্তুত</h3><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">পরবর্তী ধাপে multilingual i18n এবং per-question RTL/LTR engine যুক্ত হবে।</p></div></div>
}
function Action({title,text,icon:Icon,onClick}:{title:string;text:string;icon:typeof BookOpen;onClick:()=>void}) { return <button onClick={onClick} className="text-left rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600"><Icon size={20}/><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{text}</p></button> }
function EmptyPage({icon:Icon,title,action}:{icon:typeof BookOpen;title:string;action:string}) { return <div className="grid min-h-[60vh] place-items-center"><div className="text-center"><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-100 dark:bg-slate-900"><Icon/></div><h2 className="mt-4 font-semibold">{title}</h2><button className="mt-4 min-h-11 rounded-xl bg-slate-950 px-5 text-sm font-medium text-white dark:bg-white dark:text-slate-950">{action}</button></div></div> }
function CreatePage() { return <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h2 className="font-semibold">Create Paper Wizard</h2><p className="mt-2 text-sm text-slate-500">Exam Information → Questions → Arrangement → Design → Preview</p></div> }
function SettingsPage({theme,setTheme}:{theme:Theme;setTheme:(t:Theme)=>void}) { return <div className="max-w-3xl space-y-4"><div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h2 className="font-semibold">Appearance</h2><div className="mt-4 flex flex-wrap gap-2">{(['light','dark','system'] as Theme[]).map(t=><button key={t} onClick={()=>setTheme(t)} className={`min-h-11 rounded-xl border px-4 text-sm ${theme===t?'border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950':'border-slate-200 dark:border-slate-700'}`}>{t}</button>)}</div></div></div> }

export default App
