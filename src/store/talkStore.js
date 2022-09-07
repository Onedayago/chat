
import {makeObservable, runInAction, action, observable} from "mobx";
import * as Api from "../service/api";
import _ from "lodash"


class TalkSource {

    @observable
    msgList = [];

    @observable
    friendInfo = null;

    @observable
    userInfo = null;

    constructor() {
        makeObservable(this);
    }

    @action
    initData(data){
        global.eventBus.addListener('msg', this.onMsg);
        this.friendInfo = data.friendInfo;
        this.userInfo = data.userInfo;
    }

    @action
    clearData(){
        this.msgList = [];
        this.friendInfo = null;
        this.userInfo = null;
        global.eventBus.removeListener('msg', this.onMsg);
    }

    getMsgList = async (params) => {
        try {
            const res = await Api.getMsgList(params);
            let data = [];
            res?.data.forEach((item, index)=>{
                if(item.userId === params.userId){
                    data.push({
                        _id: item.id,
                        type: item.msgType,
                        content: { text: item.msgContent },
                        position: 'right',
                        hasTime: true,
                        createdAt: item.createdAt
                    })
                }else{
                    data.push({
                        _id: item.id,
                        type: item.msgType,
                        content: { text: item.msgContent },
                        position: 'left',
                        hasTime: true,
                        createdAt: item.createdAt
                    })
                }
            })

            runInAction(()=>{
                this.msgList = data;
            })
        } catch (e) {

        }
    }

    sendMsg = async (params) => {
        try {
            const res = await Api.sendMsg(params);
            let data = res.data;
            let msg = {
                _id: data.id,
                type: data.msgType,
                content: { text: data.msgContent },
                position: 'right',
                hasTime: true,
                createdAt: data.createdAt
            }
            runInAction(()=>{
                let arr = _.cloneDeep(this.msgList);
                arr.push(msg);
                this.msgList = arr;
            })

        } catch (e) {
            return false;
        }
    }

    onMsg = (data) => {
        let msg = null;
        //判断这次 socket 推送是否是当前用户的聊天对话
        if(data.userId === this.userInfo.id){
            msg = {
                _id: data.id,
                type: data.msgType,
                content: { text: data.msgContent },
                position: 'right',
                hasTime: true,
                createdAt: data.createdAt
            }
        }else if(data.userId === this.friendInfo.friendId){
            msg = {
                _id: data.id,
                type: data.msgType,
                content: { text: data.msgContent },
                position: 'left',
                hasTime: true,
                createdAt: data.createdAt
            }
        }

        if(msg){
            let arr = _.cloneDeep(this.msgList);
            arr.push(msg);
            runInAction(()=>{
                this.msgList = arr;
            })
        }
    }


}

const TalkStore = new TalkSource();
export default TalkStore;
