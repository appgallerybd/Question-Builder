import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import type { ExportSettings } from '../types'
export async function exportPaperPdf(element:HTMLElement,settings:ExportSettings,filename:string):Promise<void>{
 const canvas=await html2canvas(element,{scale:settings.quality==='high'?2:1.25,backgroundColor:'#fff',useCORS:true,logging:false})
 const orientation=settings.orientation==='landscape'?'landscape':'portrait'
 const pdf=new jsPDF({orientation,unit:'mm',format:settings.paperSize.toLowerCase()})
 const pageW=pdf.internal.pageSize.getWidth(),pageH=pdf.internal.pageSize.getHeight()
 const ratio=Math.min(pageW/canvas.width,pageH/canvas.height)
 pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,0,canvas.width*ratio,canvas.height*ratio)
 pdf.save(filename.endsWith('.pdf')?filename:`${filename}.pdf`)
}