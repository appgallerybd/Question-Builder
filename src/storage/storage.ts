import { STORAGE_KEYS, STORAGE_VERSION, makeEnvelope, isEnvelope } from './schema'
export class StorageError extends Error { constructor(message:string){super(message);this.name='StorageError'} }
function readRaw<T>(key:string,fallback:T):T{try{const raw=localStorage.getItem(key);if(!raw)return fallback;const parsed:unknown=JSON.parse(raw);if(!isEnvelope(parsed)||parsed.version!==STORAGE_VERSION)return fallback;return parsed.data as T}catch{return fallback}}
function writeRaw<T>(key:string,data:T):void{try{localStorage.setItem(key,JSON.stringify(makeEnvelope(data)))}catch(error){throw new StorageError(error instanceof Error?error.message:'Unable to write local storage')}}
export function storageGet<T>(key:string,fallback:T):T{return readRaw(key,fallback)}
export function storageSet<T>(key:string,data:T):void{writeRaw(key,data)}
export function storageRemove(key:string):void{try{localStorage.removeItem(key)}catch(error){throw new StorageError(error instanceof Error?error.message:'Unable to remove storage')}}
export function storageClearAll():void{Object.values(STORAGE_KEYS).forEach(storageRemove)}
