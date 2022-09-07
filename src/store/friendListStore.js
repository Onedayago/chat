

import {makeObservable, action, observable, runInAction} from "mobx";
import * as Api from "../service/api";


class friendListSource {

    @observable
    friendList = [];

    @observable
    addFriendList = [];

    constructor() {
        makeObservable(this);
    }

    @action
    clearData(){
        this.friendList = [];
        this.addFriendList = [];
    }

    @action
    getFriendList = async (params) => {
        try {
            const res = await Api.getFriendList(params);
            runInAction(()=>{
                this.friendList = res?.data;
            })
        } catch (e) {

        }

    }

    @action
    getAddFriendMsg = async (params) => {
        try {
            const res = await Api.getAddFriendMsg(params);
            runInAction(()=>{
                this.addFriendList = res?.data;
            })
        } catch (e) {

        }
    }

    //同意好友请求
    acceptAddFriend = async (params, index) => {
        try {
            const res = await Api.acceptAddFriend(params);
            runInAction(()=>{
                this.addFriendList.splice(index, 1);
            })
            return true;
        } catch (e) {
            return false;
        }
    }

    refuseAddFriend = async (params, index) => {
        try {
            const res = await Api.refuseAddFriend(params);
            runInAction(() => {
                this.addFriendList.splice(index, 1);
            })
            return true;
        } catch (e) {
            return false;
        }
    }

    deleteFriend = async (params, index) => {
        try {
            const res = await Api.deleteFriend(params);
            runInAction(() => {
                this.friendList.splice(index, 1);
            })
            return true;
        } catch (e) {
            return false;
        }
    }

}

const friendListStore = new friendListSource();
export default friendListStore;
