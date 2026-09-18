import type { ExportSettings } from '../types'
export function ExportSettingsPanel({value,onChange}:{value:ExportSettings;onChange:(v:ExportSettings)=>void}){
 const patch=(x:Partial<ExportSettings>)=>onChange({...value,...x})
 return <div className="grid gap-3 sm:grid-cols-2">
  <label className="text-sm">Paper Size<select value={value.paperSize} onChange={e=>patch({paperSize:e.target.value as ExportSettings['paperSize']})} className="mt-1 min-h-11 w-full rounded-xl border p-2 dark:bg-slate-950"><option>A4</option><option>A5</option><option>Letter</option></select></label>
  <label className="text-sm">Orientation<select value={value.orientation} onChange={e=>patch({orientation:e.target.value as ExportSettings['orientation']})} className="mt-1 min-h-11 w-full rounded-xl border p-2 dark:bg-slate-950"><option value="portrait">Portrait</option><option value="landscape">Landscape</option></select></label>
  <label className="text-sm">Margin<select value={value.margin} onChange={e=>patch({margin:e.target.value as ExportSettings['margin']})} className="mt-1 min-h-11 w-full rounded-xl border p-2 dark:bg-slate-950"><option value="narrow">Narrow</option><option value="normal">Normal</option><option value="wide">Wide</option><option value="custom">Custom</option></select></label>
  {value.margin==='custom'&&<label className="text-sm">Custom Margin (mm)<input type="number" min="0" max="40" value={value.customMargin??12} onChange={e=>patch({customMargin:Math.max(0,Math.min(40,Number(e.target.value)))})} className="mt-1 min-h-11 w-full rounded-xl border p-2 dark:bg-slate-950"/></label>}
  <label className="text-sm">Quality<select value={value.quality} onChange={e=>patch({quality:e.target.value as ExportSettings['quality']})} className="mt-1 min-h-11 w-full rounded-xl border p-2 dark:bg-slate-950"><option value="standard">Standard</option><option value="high">High</option></select></label>
 </div>
}