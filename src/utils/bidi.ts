import type { Direction } from '../types'

export const getDirectionForLanguage = (language: 'bn'|'en'|'ar'|'ur'): Direction =>
  language === 'ar' || language === 'ur' ? 'rtl' : 'ltr'

export const directionStyle = (direction: Direction): React.CSSProperties => ({
  direction,
  textAlign: direction === 'rtl' ? 'right' : 'left',
  unicodeBidi: 'isolate',
})

export function containsStrongRtl(text: string): boolean {
  return /[\u0590-\u08FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(text)
}
