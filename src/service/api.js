
import axios from "axios";
import * as Url from "./url";
import {BASEAPI} from "../config/index";
import {storage} from "../util";

const instance = axios.create({
    baseURL: BASEAPI,
    timeout: 1000,
});

instance.interceptors.request.use(function (config) {
    config.headers.Authorization = storage.get(storage.TOKEN)
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


function sendPost (url, params){
    return new Promise((resolve, reject)=>{
        instance.post(url, params).then((res)=>{
            if(res?.status === 200 && res?.statusText === "OK"){
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

export function getUsersByName (params) {
    return sendPost(Url.getUsersByName, params);
}

export function addFriend (params) {
    return sendPost(Url.addFriend, params);
}

export function getFriendList (params) {
    return sendPost(Url.getFriendList, params);
}

export function getAddFriendMsg (params) {
    return sendPost(Url.getAddFriendMsg, params);
}

export function acceptAddFriend (params) {
    return sendPost(Url.acceptAddFriend, params);
}

export function refuseAddFriend (params) {
    return sendPost(Url.refuseAddFriend, params);
}

export function deleteFriend (params) {
    return sendPost(Url.deleteFriend, params);
}

export function sendMsg (params) {
    return sendPost(Url.sendMsg, params);
}

export function getMsgList (params) {
    return sendPost(Url.getMsgList, params);
}

export function getUserStatus (params) {
    return sendPost(Url.getUserStatus, params);
}
