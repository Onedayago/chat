
import axios from "axios";
import * as Url from "./url";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 1000,
});


function sendPost (url, params){
    return new Promise((resolve, reject)=>{
        instance.post(url, params).then((res)=>{
            if(res?.status === 200 && res?.statusText === "ok"){
                if(res?.data?.code === 200){
                    resolve(res?.data);
                }else{
                    reject(res?.data?.msg);
                }
            }else{
                reject('请求出错');
            }
        }).catch((err)=>{
            reject(err?.message);
        })
    })
}

export function login (params) {
    return sendPost(Url.LOGIN, params);
}

