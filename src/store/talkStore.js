
import {makeObservable, runInAction, action, observable} from "mobx";
import * as Api from "../service/api";
import _ from "lodash"


class TalkSource {

    @observable
    msgList = [];

    constructor() {
        makeObservable(this);
    }

    @action
    initData(){
        global.eventBus.addListener('msg', this.onMsg);
    }

    @action
    clearData(){
        this.msgList = [];
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
            runInAction(()=>{
                let arr = _.cloneDeep(this.msgList);
                arr.push(res.data);
                this.msgList = arr;
            })

        } catch (e) {
            return false;
        }
    }

    onMsg = (data, userInfo) => {
        let msg;
        if(data.userId === userInfo.id){
            msg = {
                _id: data.id,
                type: data.msgType,
                content: { text: data.msgContent },
                position: 'right',
                hasTime: true,
                createdAt: data.createdAt
            }
        }else{
            msg = {
                _id: data.id,
                type: data.msgType,
                content: { text: data.msgContent },
                position: 'left',
                hasTime: true,
                createdAt: data.createdAt
            }
        }
        let arr = _.cloneDeep(this.msgList);
        arr.push(msg);
        runInAction(()=>{
            this.msgList = arr;
        })
    }


}

const TalkStore = new TalkSource();
export default TalkStore;
