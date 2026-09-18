export const STORAGE_VERSION = 1 as const
export const STORAGE_KEYS = {
 settings: 'qpg_settings', questions: 'qpg_questions', subjects: 'qpg_subjects',
 papers: 'qpg_papers', drafts: 'qpg_drafts', templates: 'qpg_templates', meta: 'qpg_meta',
} as const
export interface StorageEnvelope<T> { version:number; updatedAt:string; data:T }
export function makeEnvelope<T>(data:T):StorageEnvelope<T>{return {version:STORAGE_VERSION,updatedAt:new Date().toISOString(),data}}
export function isEnvelope(value:unknown):value is StorageEnvelope<unknown>{
 if(!value||typeof value!=='object') return false
 const v=value as Record<string,unknown>
 return typeof v.version==='number' && typeof v.updatedAt==='string' && 'data' in v
}