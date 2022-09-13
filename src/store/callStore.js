
import {observable, makeObservable, runInAction, action} from "mobx";

class CallSource {

    @observable
    stream = null;

    @observable
    remoteStream = null;

    constructor() {
        makeObservable(this);
    }

    @action
    initData(data){

    }

    @action
    clearData(){
        this.stream = null;
        this.remoteStream = null;
    }

    call = (friendPeerId, success, error) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((stream)=>{
                const call = global.peer.call(friendPeerId, stream);
                call.on("stream", (remoteStream) => {
                    runInAction(()=>{
                        this.stream = stream;
                        this.remoteStream = remoteStream;
                        success?.(stream, remoteStream);
                    })
                });
            })
            .catch((err)=>{
                alert(err.toString())
                console.log(err.toString());
                error?.();
            })
    }

    answer = (call, success, error) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream)=>{
                call.answer(stream);
                call.on("stream", (remoteStream) => {
                    runInAction(()=>{
                        this.stream = stream;
                        this.remoteStream = remoteStream;
                        success?.(stream, remoteStream);
                    })
                });
            })
            .catch((err)=>{
                console.log(err)
                error?.();
            })
    }


}

const CallStore = new CallSource();
export default CallStore;
