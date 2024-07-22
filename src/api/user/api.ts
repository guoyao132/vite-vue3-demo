import {post} from '../../plugin/axios/index.ts'
import {PostRtzhLoginProps} from "../../global/sys/user";
import {hashStr} from "../../assets/js/untils.ts";


const baseUrl = '/rtzhApi/user'

// 登录
export const postRtzhLogin = ({ password, ...props }: PostRtzhLoginProps) =>
  post({
    url: baseUrl + '/v1/login',
    data: {
      ...props,
      password,
      gptPassword: hashStr('1234')
    }
  });
export const postLogin = ({ password, ...props }: PostRtzhLoginProps) =>
  post({
    url: '/api/support/user/account/loginByPassword',
    data: {
      ...props,
      password: hashStr('1234')
    }
  });

