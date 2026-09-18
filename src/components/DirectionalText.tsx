import type { Direction, Language } from '../types'
import { directionStyle } from '../utils/bidi'

export function DirectionalText({ children, language, direction }: { children: React.ReactNode; language?: Language; direction?: Direction }) {
  const resolved = direction ?? (language === 'ar' || language === 'ur' ? 'rtl' : 'ltr')
  return <span lang={language} dir={resolved} style={directionStyle(resolved)}>{children}</span>
}
