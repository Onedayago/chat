
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

    @observable
    pageSize = 10;

    @observable
    disabled = false;

    @observable
    lastId = null;


    constructor() {
        makeObservable(this);
    }

    @action
    async initData(data) {
        global.eventBus.addListener('msg', this.onMsg);
        this.friendInfo = data.friendInfo;
        this.userInfo = data.userInfo;
        this.pageSize = 10;
        await this.getMsgList( 10 , null);
    }

    @action
    clearData(){
        this.msgList = [];
        this.friendInfo = null;
        this.userInfo = null;
        this.lastId = null;
        global.eventBus.removeListener('msg', this.onMsg);
    }

    //获取聊天记录
    getMsgList = async (pageSize, lastId) => {
        try {
            let params = {
                userId: this.userInfo.id,
                friendId: this.friendInfo.friendId,
                pageSize: pageSize,
                lastId,
            }
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
                this.lastId = data[0]._id;
                if(!lastId){
                    this.msgList = data;
                }else{
                    this.msgList = data.concat(this.msgList);
                }
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
            return true;
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
