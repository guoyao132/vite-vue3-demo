import axios from 'axios'
import type {InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig, ResponseType} from 'axios'
import {ElLoading } from 'element-plus'
import qs from 'qs'
import { TOKEN_ERROR_CODE } from './error/errorCode';
import {clearToken,getToken, getRtzhToken} from "../../hooks/sys/UserInfo.ts"
import {a} from "vite/dist/node/types.d-aGj9QkWt";
interface ResponseDataType {
  code: number;
  message: string;
  data: any;
}
// JSON axios
axios.defaults.transformRequest = [function (data, config) {
  if (config['Content-Type'] == 'application/x-www-form-urlencoded') {
    return qs.stringify(data);
  } else if (config['Content-Type'] == 'application/json') {
    return JSON.stringify(data);
  } else {
    return data;
  }
}];
// 创建一个 axios 实例
const service = axios.create({
  timeout: 300000 // 请求超时时间
})
// 请求拦截器
let loadingInstance: any;
let i:number = 0;
const isHasLoading = (config: InternalAxiosRequestConfig) => {
  let postNoLoading = false;
  if(config.method === 'post'){
    let postData = config.data;
    if((postData && postData.noLoading) || (typeof postData == 'string' && postData.indexOf('noLoading') !== -1)){
      postNoLoading = true;
    }
  }
  return !((config.params && config.params.noLoading) || postNoLoading);
}
const addLoading = (config:InternalAxiosRequestConfig) => {
  if (isHasLoading(config)) {
    i++
    loadingInstance = ElLoading.service({ //加载loading
      fullscreen: true,
      text: 'Loading',
      // spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }
}
const closeLoading = (response:AxiosResponse<ResponseDataType>) => {
  let config:InternalAxiosRequestConfig = response.config;
  if(isHasLoading(config)){
    i--;
  }
  (i <= 0) && loadingInstance && loadingInstance.close && setTimeout(() => {
    loadingInstance.close();
  }, 100);
}
service.interceptors.request.use(
  (config:InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      if(config.baseURL === '/rtzhApi' || config.baseURL === '/rtzhApiFast' || config.baseURL === ''){
        if (config.headers) {
          config.headers['Authorization'] = getRtzhToken();
          config.headers.Gpttoken = getToken();
        }
      }else{
        if (config.headers) {
          config.headers.token = getToken();
        }
      }
      addLoading(config);
      return config;
    },
    error => {
      // 发送失败
      console.error(error)
      return Promise.reject(error)
    }
)
// 响应拦截器
service.interceptors.response.use(
    (response:AxiosResponse<ResponseDataType>) => {
      closeLoading(response);
      let dataAxios = response.data
      if(dataAxios === undefined){
        return Promise.reject('服务器异常');
      }else if(dataAxios.code < 200 || dataAxios.code >= 400){
        return Promise.reject(dataAxios)
      }
      return dataAxios.data;
    },
    error => {
      console.error(error)
      if (typeof error === 'string') {
        return Promise.reject({ message: error });
      }else if(error.msg){
        return Promise.reject({ message: error.msg });
      }
      closeLoading(error);
      if (!error) {
        return Promise.reject({ message: '未知错误' });
      }
      // 有报错响应
      if (error?.code in TOKEN_ERROR_CODE) {
        clearToken();
        if (
          !(window.location.pathname === '/chat/share' || window.location.pathname === '/chat/team')
        ) {
          window.location.replace(
            `/login?lastRoute=${encodeURIComponent(location.pathname + location.search)}`
          );
        }

        return Promise.reject({ message: '无权操作' });
      }
      if (error?.response?.data) {
        return Promise.reject(error?.response?.data);
      }
      return Promise.reject(error);
    }
)

interface axiosData {
  url: string;
  data?: any;
  auth?: string;
  method?: string;
  responseType?: ResponseType;
  contentType?: string;
  params?: any;
}
export const get = (data: axiosData): any => {
  return service({
    method: "get",
    url: data.url,
    params: data.data,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: data.auth
  } as AxiosRequestConfig)
}
export const post = (data: axiosData): any => {
  return service({
    method: "post",
    url: data.url,
    data: data.data,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: data.auth
  } as AxiosRequestConfig)
}
export const put = (data: axiosData) => {
  return service({
    method: "put",
    url: data.url,
    data: data.data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      charset: 'UTF-8'
    }
  } as AxiosRequestConfig)
}
export const deleted = (data:axiosData) => {
  return service({
    method: "delete",
    url: data.url,
    data: data.data,
  })
}
export const postFormdata = (data: axiosData) => {
  return service({
    method: "post",
    url: data.url,
    data: data.data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: data.auth
  } as AxiosRequestConfig)
}
/* 下载文件、上传文件  表单提交
*
*  ①如果表单提交，并且返回的数据类型为json 时，需要传入   responseType:'json' ,method:'post'
*  ②上传和下载文件时：根据具体情况传入 method 和 contentType 此时不需要传入 responseType
*
* */
export const ajaxFile = (data: axiosData) => {
  // params: data.data,
  let opt:AxiosRequestConfig = {
    method: data.method || "get",
    url: data.url,
    responseType: data.responseType || 'blob',// 表明返回服务器返回的数据类型
    headers: {
      'Content-Type': data.contentType || 'multipart/form-data'
    }
  };
  if(data.method == 'post'){
    opt.data = data.data;
  }else{
    opt.params = data.data;
  }
  return service(opt)
}
