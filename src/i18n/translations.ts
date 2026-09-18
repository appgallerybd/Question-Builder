export type AppLanguage = 'bn' | 'en' | 'ar' | 'ur'

export type TranslationKey =
  | 'appName' | 'appSubtitle' | 'dashboard' | 'createPaper' | 'questionBank' | 'savedPapers' | 'settings'
  | 'welcome' | 'whatToCreate' | 'totalQuestions' | 'totalPapers' | 'drafts' | 'subjects'
  | 'addQuestion' | 'createNewPaper' | 'appearance' | 'light' | 'dark' | 'system'
  | 'multilingualWorkflow' | 'fourLanguages' | 'search' | 'openMenu' | 'closeMenu'
  | 'examInformation' | 'questions' | 'arrangement' | 'design' | 'preview'
  | 'noQuestions' | 'noPapers' | 'nextStep'

export const languageMeta: Record<AppLanguage, { label: string; nativeLabel: string; dir: 'ltr' | 'rtl'; locale: string }> = {
  bn: { label: 'Bangla', nativeLabel: 'বাংলা', dir: 'ltr', locale: 'bn-BD' },
  en: { label: 'English', nativeLabel: 'English', dir: 'ltr', locale: 'en-US' },
  ar: { label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl', locale: 'ar' },
  ur: { label: 'Urdu', nativeLabel: 'اردو', dir: 'rtl', locale: 'ur' },
}

const bn: Record<TranslationKey, string> = {
  appName:'Question Builder', appSubtitle:'Multilingual Generator', dashboard:'ড্যাশবোর্ড', createPaper:'প্রশ্নপত্র তৈরি',
  questionBank:'প্রশ্ন ব্যাংক', savedPapers:'সংরক্ষিত পেপার', settings:'সেটিংস', welcome:'স্বাগতম', whatToCreate:'আজ কী তৈরি করবেন?',
  totalQuestions:'মোট প্রশ্ন', totalPapers:'মোট পেপার', drafts:'Draft', subjects:'মোট বিষয়', addQuestion:'প্রশ্ন যোগ করুন',
  createNewPaper:'পেপার তৈরি করুন', appearance:'অ্যাপের চেহারা', light:'লাইট', dark:'ডার্ক', system:'সিস্টেম',
  multilingualWorkflow:'Multilingual workflow', fourLanguages:'চার ভাষার জন্য প্রস্তুত', search:'খুঁজুন', openMenu:'মেনু খুলুন', closeMenu:'মেনু বন্ধ করুন',
  examInformation:'পরীক্ষার তথ্য', questions:'প্রশ্ন', arrangement:'সাজানো', design:'ডিজাইন', preview:'প্রিভিউ',
  noQuestions:'কোনো প্রশ্ন এখনো নেই', noPapers:'কোনো সংরক্ষিত পেপার নেই', nextStep:'পরবর্তী ধাপ'
}
const en: Record<TranslationKey, string> = {
  appName:'Question Builder', appSubtitle:'Multilingual Generator', dashboard:'Dashboard', createPaper:'Create Question Paper',
  questionBank:'Question Bank', savedPapers:'Saved Papers', settings:'Settings', welcome:'Welcome', whatToCreate:'What will you create today?',
  totalQuestions:'Total Questions', totalPapers:'Total Papers', drafts:'Drafts', subjects:'Total Subjects', addQuestion:'Add Question',
  createNewPaper:'Create Paper', appearance:'Appearance', light:'Light', dark:'Dark', system:'System',
  multilingualWorkflow:'Multilingual workflow', fourLanguages:'Ready for four languages', search:'Search', openMenu:'Open menu', closeMenu:'Close menu',
  examInformation:'Exam Information', questions:'Questions', arrangement:'Arrangement', design:'Design', preview:'Preview',
  noQuestions:'No questions yet', noPapers:'No saved papers', nextStep:'Next Step'
}
const ar: Record<TranslationKey, string> = {
  appName:'منشئ الأسئلة', appSubtitle:'مولّد متعدد اللغات', dashboard:'لوحة التحكم', createPaper:'إنشاء ورقة الأسئلة',
  questionBank:'بنك الأسئلة', savedPapers:'الأوراق المحفوظة', settings:'الإعدادات', welcome:'مرحباً', whatToCreate:'ماذا ستنشئ اليوم؟',
  totalQuestions:'إجمالي الأسئلة', totalPapers:'إجمالي الأوراق', drafts:'المسودات', subjects:'إجمالي المواد', addQuestion:'إضافة سؤال',
  createNewPaper:'إنشاء ورقة', appearance:'المظهر', light:'فاتح', dark:'داكن', system:'النظام',
  multilingualWorkflow:'سير عمل متعدد اللغات', fourLanguages:'جاهز للغات الأربع', search:'بحث', openMenu:'فتح القائمة', closeMenu:'إغلاق القائمة',
  examInformation:'معلومات الاختبار', questions:'الأسئلة', arrangement:'الترتيب', design:'التصميم', preview:'المعاينة',
  noQuestions:'لا توجد أسئلة بعد', noPapers:'لا توجد أوراق محفوظة', nextStep:'الخطوة التالية'
}
const ur: Record<TranslationKey, string> = {
  appName:'سوالیہ پرچہ ساز', appSubtitle:'کثیر لسانی جنریٹر', dashboard:'ڈیش بورڈ', createPaper:'سوالیہ پرچہ بنائیں',
  questionBank:'سوالات کا بینک', savedPapers:'محفوظ پرچے', settings:'ترتیبات', welcome:'خوش آمدید', whatToCreate:'آج کیا بنانا ہے؟',
  totalQuestions:'کل سوالات', totalPapers:'کل پرچے', drafts:'مسودے', subjects:'کل مضامین', addQuestion:'سوال شامل کریں',
  createNewPaper:'پرچہ بنائیں', appearance:'ظاہری شکل', light:'روشن', dark:'تاریک', system:'سسٹم',
  multilingualWorkflow:'کثیر لسانی ورک فلو', fourLanguages:'چار زبانوں کے لیے تیار', search:'تلاش', openMenu:'مینو کھولیں', closeMenu:'مینو بند کریں',
  examInformation:'امتحان کی معلومات', questions:'سوالات', arrangement:'ترتیب', design:'ڈیزائن', preview:'پیش نظارہ',
  noQuestions:'ابھی کوئی سوال نہیں', noPapers:'کوئی محفوظ پرچہ نہیں', nextStep:'اگلا مرحلہ'
}
export const translations: Record<AppLanguage, Record<TranslationKey,string>> = { bn, en, ar, ur }