

import {makeObservable, runInAction, action, observable} from "mobx";
import {io} from "socket.io-client";

class SocketSource {

    @observable
    connect = false;

    @observable
    userInfo = null;

    constructor() {
        makeObservable(this);
        this.io = new io("http://192.168.31.5:3000");
        this.io.on('connect', ()=>{
            console.log('connect')
            runInAction(()=>{
                this.connect = true;
            })
            if(this.userInfo){
                console.log('login')
                this.socketLogin();
            }
        })

        this.io.on('msg', (data)=>{
            global.eventBus.emit('msg', data, this.userInfo);
        })

        this.io.on('disconnect', ()=>{
            runInAction(()=>{
                this.connect = false;
            })
        })
    }

    @action
    clearData(){
        this.storeName = new Set();
        this.stores = [];
    }

    @action
    init(data){
        this.userInfo = data?.userInfo;
    }

    socketLogin = () => {
        this.io.emit('login', this.userInfo);
    }

    socketLoginOut = () => {
        this.io.emit('loginOut', this.userInfo);
    }

}

const SocketStore = new SocketSource();
export default SocketStore;
