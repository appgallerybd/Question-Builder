import { create } from 'zustand'
import type { AppLanguage } from '../i18n'
import type { Question, QuestionPaper, Subject } from '../types'
import { STORAGE_KEYS } from '../storage'
import { LocalRepository } from '../storage/repository'

type Theme='light'|'dark'|'system'
interface AppStore{
 language:AppLanguage; theme:Theme; questions:Question[]; papers:QuestionPaper[]; subjects:Subject[]
 setLanguage:(language:AppLanguage)=>void; setTheme:(theme:Theme)=>void
 addQuestion:(question:Question)=>void; updateQuestion:(question:Question)=>void; deleteQuestion:(id:string)=>void
 addPaper:(paper:QuestionPaper)=>void; updatePaper:(paper:QuestionPaper)=>void; deletePaper:(id:string)=>void
 hydrate:()=>void
}
const questionRepo=new LocalRepository<Question>(STORAGE_KEYS.questions)
const paperRepo=new LocalRepository<QuestionPaper>(STORAGE_KEYS.papers)
const subjectRepo=new LocalRepository<Subject>(STORAGE_KEYS.subjects)
export const useAppStore=create<AppStore>((set,get)=>({
 language:'bn',theme:'light',questions:[],papers:[],subjects:[],
 setLanguage:language=>set({language}),setTheme:theme=>set({theme}),
 addQuestion:question=>{questionRepo.save(question);set({questions:questionRepo.list()})},
 updateQuestion:question=>{questionRepo.save(question);set({questions:questionRepo.list()})},
 deleteQuestion:id=>{questionRepo.delete(id);set({questions:questionRepo.list()})},
 addPaper:paper=>{paperRepo.save(paper);set({papers:paperRepo.list()})},
 updatePaper:paper=>{paperRepo.save(paper);set({papers:paperRepo.list()})},
 deletePaper:id=>{paperRepo.delete(id);set({papers:paperRepo.list()})},
 hydrate:()=>set({questions:questionRepo.list(),papers:paperRepo.list(),subjects:subjectRepo.list(),language:get().language,theme:get().theme})
}))