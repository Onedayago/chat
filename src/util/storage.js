

export const USERINFO = "USERINFO";

export function save(key, value){
    window.localStorage.setItem(key, value);
}

export function get(key){
    return window.localStorage.getItem(key);
}

export function del(key){
    window.localStorage.removeItem(key);
}
