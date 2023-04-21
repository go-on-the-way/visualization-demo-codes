import { get, set, del, clear, setMany, delMany, update, entries, keys, values } from 'idb-keyval'

export function setData(key:string,value:any):Promise<any>{
    return set(key,value).then(()=>{console.log(`set ${key};${value}`)})
}

export function getData(key:string):Promise<any>{
    return get(key)
}

export function delData(key:string):Promise<any>{
    return del(key)
}