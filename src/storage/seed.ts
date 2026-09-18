import type { Question } from '../types'
import { storageGet, storageSet, STORAGE_KEYS } from './index'
export function seedDemoData():void{
 const existing=storageGet<Question[]>(STORAGE_KEYS.questions,[])
 if(existing.length)return
 const now=new Date().toISOString()
 const demo:Question[]=[
  {id:'demo_bn_1',language:'bn',direction:'ltr',questionText:'বাংলাদেশের রাজধানীর নাম কী?',questionType:'mcq',subject:'সাধারণ জ্ঞান',chapter:'বাংলাদেশ',topic:'রাজধানী',className:'Class 8',difficulty:'easy',marks:1,options:[{id:'a',text:'ঢাকা'},{id:'b',text:'চট্টগ্রাম'},{id:'c',text:'খুলনা'},{id:'d',text:'রাজশাহী'}],correctAnswer:'a',tags:['demo'],createdAt:now,updatedAt:now},
  {id:'demo_en_1',language:'en',direction:'ltr',questionText:'What is the capital of Bangladesh?',questionType:'mcq',subject:'General Knowledge',chapter:'Bangladesh',topic:'Capital',className:'Class 8',difficulty:'easy',marks:1,options:[{id:'a',text:'Dhaka'},{id:'b',text:'Chattogram'},{id:'c',text:'Khulna'},{id:'d',text:'Rajshahi'}],correctAnswer:'a',tags:['demo'],createdAt:now,updatedAt:now},
  {id:'demo_ar_1',language:'ar',direction:'rtl',questionText:'ما عاصمة بنغلاديش؟',questionType:'short',subject:'اللغة العربية',chapter:'معلومات عامة',topic:'بنغلاديش',className:'الصف الثامن',difficulty:'easy',marks:2,tags:['demo'],createdAt:now,updatedAt:now},
  {id:'demo_ur_1',language:'ur',direction:'rtl',questionText:'بنگلہ دیش کا دارالحکومت کیا ہے؟',questionType:'short',subject:'عمومی معلومات',chapter:'بنگلہ دیش',topic:'دارالحکومت',className:'آٹھویں جماعت',difficulty:'easy',marks:2,tags:['demo'],createdAt:now,updatedAt:now},
 ]
 storageSet(STORAGE_KEYS.questions,demo)
}