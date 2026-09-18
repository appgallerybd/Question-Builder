export * from './translations'
import { AppLanguage, languageMeta, TranslationKey, translations } from './translations'

export function getTranslation(language: AppLanguage, key: TranslationKey): string {
  return translations[language][key]
}
export function applyDocumentLanguage(language: AppLanguage) {
  const meta = languageMeta[language]
  document.documentElement.lang = meta.locale
  document.documentElement.dir = meta.dir
}
