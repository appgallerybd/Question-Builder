import { storageGet, storageSet } from './storage'
export class LocalRepository<T extends {id:string}>{
 constructor(private readonly key:string){}
 list():T[]{return storageGet<T[]>(this.key,[])}
 get(id:string):T|undefined{return this.list().find(item=>item.id===id)}
 save(entity:T):T{const items=this.list();const next=items.some(x=>x.id===entity.id)?items.map(x=>x.id===entity.id?entity:x):[...items,entity];storageSet(this.key,next);return entity}
 delete(id:string):void{storageSet(this.key,this.list().filter(x=>x.id!==id))}
 replaceAll(items:T[]):void{storageSet(this.key,items)}
}
