
import {observable, makeObservable, runInAction, action} from "mobx";
import {Peer} from "peerjs";


class CallSource {

    @observable
    stream = null;

    @observable
    remoteStream = null;

    @observable
    userInfo = null;

    constructor() {
        makeObservable(this);
    }

    @action
    initData(data){
        this.userInfo = data?.userInfo;
        this.peer = new Peer(this.userInfo.id);
    }

    @action
    clearData(){
        this.stream = null;
        this.remoteStream = null;
        this.userInfo = null;
    }

    call = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((stream)=>{
                runInAction(()=>{
                    this.stream = stream;
                })
            })
            .catch((err)=>{
                console.log(err.toString());
            })
    }


}

const CallStore = new CallSource();
export default CallStore;
