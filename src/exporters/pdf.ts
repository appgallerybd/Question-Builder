import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import type { ExportSettings } from '../types'
const margins={narrow:6,normal:12,wide:20}
export async function exportPaperPdf(element:HTMLElement,settings:ExportSettings,filename:string):Promise<void>{
 const canvas=await html2canvas(element,{scale:settings.quality==='high'?2:1.5,backgroundColor:'#fff',useCORS:true,logging:false})
 const orientation=settings.orientation==='landscape'?'landscape':'portrait'
 const pdf=new jsPDF({orientation,unit:'mm',format:settings.paperSize})
 const pageW=pdf.internal.pageSize.getWidth(),pageH=pdf.internal.pageSize.getHeight()
 const margin=settings.margin==='custom'?12:margins[settings.margin]
 const usableW=pageW-margin*2,usableH=pageH-margin*2
 const pxPerMm=canvas.width/usableW
 const sliceHeight=Math.max(1,Math.floor(usableH*pxPerMm))
 let offset=0
 while(offset<canvas.height){
  const height=Math.min(sliceHeight,canvas.height-offset)
  const slice=document.createElement('canvas');slice.width=canvas.width;slice.height=height
  const ctx=slice.getContext('2d');if(!ctx)throw new Error('Unable to create PDF canvas')
  ctx.fillStyle='#fff';ctx.fillRect(0,0,slice.width,slice.height);ctx.drawImage(canvas,0,offset,canvas.width,height,0,0,canvas.width,height)
  const renderedH=height/pxPerMm
  if(offset>0)pdf.addPage()
  pdf.addImage(slice.toDataURL('image/jpeg',0.94),'JPEG',margin,margin,usableW,renderedH)
  offset+=height
 }
 pdf.save(filename.endsWith('.pdf')?filename:`${filename}.pdf`)
}
