

import {makeObservable, runInAction, action, observable} from "mobx";
import {io} from "socket.io-client";
import {Peer} from "peerjs";
import {Dialog} from "antd-mobile";
import {BASEIP, BASEPORT} from "../config";

class SocketSource {

    @observable
    connect = false;

    @observable
    userInfo = null;

    @observable
    peerId = null;

    constructor() {
        makeObservable(this);
        this.io = new io(`${BASEIP}:${BASEPORT}`);
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
            global.eventBus.emit('msg', data);
        })

        this.io.on('disconnect', ()=>{
            runInAction(()=>{
                this.connect = false;
            })
        })
    }

    @action
    clearData(){
        global.peer&&global.peer.disconnect();
    }

    @action
    init(data){
        this.userInfo = data?.userInfo;
    }

    socketLogin = () => {
        global.peer = new Peer({
            host: BASEIP,
            port: BASEPORT,
            path: '/peerjs/myapp',
            debug: 3,
            logFunction: console.log,
            config: {
                'iceServers': [
                    {
                        urls: "turn:openrelay.metered.ca:443?transport=tcp",
                        username: "openrelayproject",
                        credential: "openrelayproject",
                    },
                ]
            }
        });
        global.peer.on('open', (id)=>{
            this.userInfo['peerId'] = id;
            console.log("peerId"+id);
            runInAction(()=>{
                this.peerId = id;
            })
            this.io.emit('login', this.userInfo);
        })

        global.peer.on('call', (call)=>{
            global.eventBus.emit('onAnswer', {call});
        })
    }

    socketLoginOut = () => {
        this.io.emit('loginOut', this.userInfo);
    }



}

const SocketStore = new SocketSource();
export default SocketStore;
