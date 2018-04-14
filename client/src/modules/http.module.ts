import Axios, { AxiosRequestConfig } from 'axios';
require('es6-promise/auto');

const url = location.href.includes('localhost') ? 'http://localhost:3000/api' : location.href;

export const setJWT = (jwt: string) => {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
};

export const get = async (api: string, config?: AxiosRequestConfig) =>
    (await Axios.get(url + api, config)).data;

export const post = async (api: string, data?: any, config?: AxiosRequestConfig) =>
    (await Axios.post(url + api, data, config)).data;

export const put = async (api: string, data?: any, config?: AxiosRequestConfig) =>
    (await Axios.put(url + api, data, config)).data;

export const remove = async (api: string, config?: AxiosRequestConfig) =>
    (await Axios.delete(url + api, config)).data;