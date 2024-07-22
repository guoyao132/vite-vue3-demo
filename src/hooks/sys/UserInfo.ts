import {
  setLocalStorage,
  getLocalStorage
} from '../../assets/js/common.ts'
import {USER, ResLogin} from "../../global/sys/user";
const tokenKey = 'token';
const rtzhTokenKey = 'rtzhToken';
const rtzhUserKey = 'rtzhUser';

export const setToken = (token: string) => setLocalStorage(tokenKey, token);

export const getToken = () => getLocalStorage(tokenKey);

export const setRtzhToken = (token: string) => setLocalStorage(rtzhTokenKey, token);

export const getRtzhToken = () => {
  let token:string = localStorage.getItem(rtzhTokenKey) || '';
  return token ? 'Bearer ' + token : '';
};

export const setRtzhUser = (user: USER) => {
  setLocalStorage(rtzhUserKey, JSON.stringify(user))
};
export const setLoginMsg = (data: ResLogin) => {
  setToken(data.token);
  setRtzhToken(data.rtzhToken);
  setRtzhUser(data.user);
}

export const getRtzhUser = () => {
  let user: USER = JSON.parse(getLocalStorage(rtzhUserKey) || '{}');
  return user;
};

export const clearToken = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(rtzhTokenKey);
  localStorage.removeItem(rtzhUserKey);
};
