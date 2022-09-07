

import {makeObservable, action, observable, runInAction} from "mobx";
import * as Api from "../service/api";
import {Toast} from "antd-mobile";


class addFriendSource {

    @observable
    userList = [];

    @observable
    page = 0;

    @observable
    pageSize = 10;

    constructor() {
        makeObservable(this);
    }

    @action
    clearData(){
        this.userList = [];
        this.page = 0;
        this.pageSize = 10;
    }

    @action
    searchUser = async (userId, username) => {
        try {
            let params = {
                userId,
                username,
                page: this.page,
                pageSize: this.pageSize
            }
            const res = await Api.getUsersByName(params);
            runInAction(()=>{
                this.userList = res?.data;
            })
        } catch (e) {

        }
    }

    @action
    addFriend = async (params, index) => {
        try {
            const res = await Api.addFriend(params);
            this.userList.splice(index, 1);
            Toast.show(res?.msg);
        } catch (e) {
            Toast.show(e.toString());
        }
    }
}

const addFriendStore = new addFriendSource();
export default addFriendStore;
