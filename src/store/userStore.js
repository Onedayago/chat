
import {makeObservable, runInAction, action, observable} from "mobx";
import * as Api from "../service/api";

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

    @action
    doLogin = async (params) => {
        try {
            const res = await Api.login(params);
            this.userInfo = res?.data
        }catch (e){

        }
    }


}

const userStore = new userSource();
export default userStore;
