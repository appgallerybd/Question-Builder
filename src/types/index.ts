export type Language = 'bn' | 'en' | 'ar' | 'ur'
export type Direction = 'ltr' | 'rtl'
export type QuestionType = 'mcq' | 'multiple-select' | 'short' | 'broad' | 'creative' | 'fill-blank' | 'true-false' | 'matching' | 'descriptive' | 'custom'
export interface QuestionOption { id: string; text: string; }
export interface Question { id: string; language: Language; direction: Direction; questionText: string; questionType: QuestionType; subject: string; chapter: string; topic: string; className: string; difficulty: 'easy'|'medium'|'hard'; marks: number; options?: QuestionOption[]; correctAnswer?: string|string[]; explanation?: string; tags: string[]; createdAt: string; updatedAt: string; }
export interface QuestionPaper { id: string; name: string; institutionName: string; examName: string; className: string; subject: string; academicYear: string; examDate?: string; time?: string; fullMarks: number; teacherName?: string; instructions?: string; questionIds: string[]; template: string; status: 'draft'|'final'|'archived'; createdAt: string; updatedAt: string; }
export interface Subject { id: string; name: string; createdAt: string; }
export interface ExportSettings { paperSize: 'A4'|'A5'|'Letter'; orientation: 'portrait'|'landscape'; margin: 'narrow'|'normal'|'wide'|'custom'; quality: 'standard'|'high'; }
