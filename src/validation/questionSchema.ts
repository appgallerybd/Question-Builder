import { z } from 'zod'
export const questionOptionSchema=z.object({id:z.string().min(1),text:z.string().min(1).max(2000)})
export const questionSchema=z.object({
 id:z.string().min(1),language:z.enum(['bn','en','ar','ur']),direction:z.enum(['ltr','rtl']),
 questionText:z.string().trim().min(1).max(20000),questionType:z.enum(['mcq','multiple-select','short','broad','creative','fill-blank','true-false','matching','descriptive','custom']),
 subject:z.string().trim().min(1).max(200),chapter:z.string().max(200),topic:z.string().max(200),className:z.string().max(100),
 difficulty:z.enum(['easy','medium','hard']),marks:z.number().min(0).max(1000),options:z.array(questionOptionSchema).max(20).optional(),
 correctAnswer:z.union([z.string(),z.array(z.string())]).optional(),explanation:z.string().max(10000).optional(),
 tags:z.array(z.string().trim().min(1).max(100)).max(30),subQuestions:z.array(z.object({id:z.string().min(1),label:z.string().max(20),text:z.string().max(20000),marks:z.number().min(0).max(1000)})).max(100).optional(),table:z.object({id:z.string().min(1),rows:z.array(z.array(z.string().max(5000)).min(1).max(50)).max(100),hasHeader:z.boolean(),direction:z.enum(['ltr','rtl'])}).optional(),media:z.array(z.object({id:z.string().min(1),dataUrl:z.string().startsWith('data:image/'),alt:z.string().max(500),width:z.number().min(25).max(100),align:z.enum(['left','center','right'])})).max(20).optional(),createdAt:z.string(),updatedAt:z.string()
}).superRefine((q,ctx)=>{
 if((q.questionType==='mcq'||q.questionType==='multiple-select') && (!q.options||q.options.length<2))ctx.addIssue({code:'custom',path:['options'],message:'MCQ requires at least two options'})
})
export type QuestionInput=z.infer<typeof questionSchema>
