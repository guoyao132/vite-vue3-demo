export const setLocalStorage = (key:string,value:any) => {
  localStorage.setItem(key, value)
}
export const setSessionStorage = (key:string,value:any) => {
  // sessionStorage.setItem(key,sm4.encrypt(value))
  sessionStorage.setItem(key, value)
}
export const getLocalStorage = (key:string) => {
  let item = localStorage.getItem(key);
  if(item){
    try {
      // item = sm4.decrypt(item);
    }catch (ignore){}
    return item;
  }
  return null;
}
export const getSessionStorage = (key:string) => {
  let item = sessionStorage.getItem(key);
  if(item){
    try {
      // item = sm4.decrypt(item);
    }catch (ignore){}
    return item;
  }
  return null;
}
export default {
  setLocalStorage,
  setSessionStorage,
  getLocalStorage,
  getSessionStorage
}
