import type { Language } from '../types'
export type NumberingStyle='arabic'|'western'|'bangla'|'alpha'|'bangla-alpha'|'arabic-alpha'
const bn=['০','১','২','৩','৪','৫','৬','৭','৮','৯'], ar=['٠','١','٢','٣','٤','٥','٦','٧','٨','٩']
const convert=(n:number,d:string[])=>String(n).split('').map(x=>d[Number(x)]).join('')
export function formatNumber(n:number,style:NumberingStyle):string{
 if(style==='bangla')return convert(n,bn)+'।'
 if(style==='arabic')return convert(n,ar)+'.'
 if(style==='alpha')return String.fromCharCode(64+n)+'.'
 if(style==='bangla-alpha')return (bnAlpha[n-1]??String(n))+'.'
 if(style==='arabic-alpha')return (arAlpha[n-1]??String(n))+'.'
 return n+'.'
}
const bnAlpha=['ক','খ','গ','ঘ','ঙ','চ','ছ','জ','ঝ','ঞ','ট','ঠ','ড','ঢ','ণ','ত','থ','দ','ধ','ন']
const arAlpha=['أ','ب','ج','د','هـ','و','ز','ح','ط','ي','ك','ل','م','ن','س','ع','ف','ص','ق','ر']
export function defaultNumbering(language:Language):NumberingStyle{return language==='bn'?'bangla':language==='ar'||language==='ur'?'arabic':'western'}