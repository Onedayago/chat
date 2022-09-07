
import {makeObservable, runInAction, action, observable} from "mobx";
import * as Api from "../service/api";
import {storage} from "../util/index";

class userSource {

    @observable
    userInfo = null;

    constructor() {
        makeObservable(this);
    }

    @action
    clearData(){
        this.userInfo = null;
    }

    doLogin = async (params) => {
        try {
            const res = await Api.login(params);
            runInAction(()=>{
                this.userInfo = res?.data;
                storage.save(storage.USERINFO, JSON.stringify(res?.data));
            })
            return true;
        }catch (e){
            return false;
        }
    }

    //获取用户信息
    getUserInfo = () => {
        if(this.userInfo){
            return this.userInfo;
        }else{
            return JSON.parse(storage.get(storage.USERINFO));
        }
    }

}

const userStore = new userSource();
export default userStore;
