import { Document, HeadingLevel, ImageRun, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from 'docx'
import type { Question, QuestionPaper } from '../types'
function dataUrlBytes(dataUrl:string):Uint8Array{const base64=dataUrl.split(',')[1]??'';const bin=atob(base64);const bytes=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);return bytes}
function qParagraph(q:Question,i:number){return new Paragraph({children:[new TextRun({text:`${i+1}. `,bold:true}),new TextRun({text:q.questionText})],bidirectional:q.direction==='rtl'})}
export async function exportPaperDocx(paper:QuestionPaper,questions:Question[],filename:string):Promise<void>{
 const map=new Map(questions.map(q=>[q.id,q]));const children:(Paragraph|Table)[]=[
  new Paragraph({text:paper.institutionName||'Institution Name',heading:HeadingLevel.HEADING_1,alignment:'center'}),
  new Paragraph({text:paper.examName||'Examination',heading:HeadingLevel.HEADING_2,alignment:'center'}),
  new Paragraph({text:`${paper.className}   |   ${paper.subject}   |   ${paper.time??''}   |   Full Marks: ${paper.fullMarks}`,alignment:'center'})
 ]
 if(paper.instructions)children.push(new Paragraph({children:[new TextRun({text:paper.instructions})]}))
 for(let i=0;i<paper.questionIds.length;i++){const q=map.get(paper.questionIds[i]);if(!q)continue;children.push(qParagraph(q,i))
  if(q.options)for(let j=0;j<q.options.length;j++)children.push(new Paragraph({text:`${String.fromCharCode(65+j)}. ${q.options[j].text}`,bidirectional:q.direction==='rtl'}))
  if(q.subQuestions)for(const s of q.subQuestions)children.push(new Paragraph({children:[new TextRun({text:`${s.label} `,bold:true}),new TextRun({text:s.text}),new TextRun({text:` [${s.marks}]`})],bidirectional:q.direction==='rtl'}))
  if(q.media)for(const m of q.media)children.push(new Paragraph({alignment:m.align==='center'?'center':m.align==='right'?'right':'left',children:[new ImageRun({data:dataUrlBytes(m.dataUrl),transformation:{width:500,height:300}})]}))
  if(q.table)children.push(new Table({rows:q.table.rows.map(row=>new TableRow({children:row.map(cell=>new TableCell({children:[new Paragraph({text:cell,bidirectional:q.table?.direction==='rtl'})]})})))}))
 }
 const doc=new Document({sections:[{properties:{page:{margin:{top:720,bottom:720,left:720,right:720}}},children}]})
 const blob=await Packer.toBlob(doc);const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename.endsWith('.docx')?filename:`${filename}.docx`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
