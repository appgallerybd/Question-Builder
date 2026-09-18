import { Document, HeadingLevel, Packer, Paragraph, TextRun } from 'docx'
import type { Question, QuestionPaper } from '../types'
export async function exportPaperDocx(paper:QuestionPaper,questions:Question[],filename:string):Promise<void>{
 const map=new Map(questions.map(q=>[q.id,q]))
 const children:Paragraph[]=[new Paragraph({text:paper.institutionName||'Institution Name',heading:HeadingLevel.HEADING_1,alignment:'center'}),new Paragraph({text:paper.examName||'Examination',heading:HeadingLevel.HEADING_2,alignment:'center'}),new Paragraph({text:`${paper.className}   |   ${paper.subject}   |   ${paper.time??''}   |   Full Marks: ${paper.fullMarks}`,alignment:'center'})]
 if(paper.instructions)children.push(new Paragraph({children:[new TextRun({text:paper.instructions})]}))
 paper.questionIds.forEach((id,i)=>{const q=map.get(id);if(!q)return;children.push(new Paragraph({children:[new TextRun({text:`${i+1}. `,bold:true}),new TextRun({text:q.questionText})],bidirectional:q.direction==='rtl'}));if(q.options)q.options.forEach((o,j)=>children.push(new Paragraph({text:`${String.fromCharCode(65+j)}. ${o.text}`,bidirectional:q.direction==='rtl',indent:{left:360}})))})
 const doc=new Document({sections:[{properties:{page:{margin:{top:720,bottom:720,left:720,right:720}}},children}]})
 const blob=await Packer.toBlob(doc);const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename.endsWith('.docx')?filename:`${filename}.docx`;a.click();URL.revokeObjectURL(url)
}