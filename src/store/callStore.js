
import {observable, makeObservable, runInAction, action} from "mobx";
import {Toast} from "antd-mobile";
import {getUserStatus} from "../service/api";

class CallSource {

    @observable
    stream = null;

    @observable
    remoteStream = null;

    @observable
    visible = false;

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
        this.visible = false;
    }

    @action
    close = () => {
        this.visible = false;
        this.stream?.getTracks().forEach(function(track) {
            track.stop();
        });
        this.remoteStream?.getTracks().forEach(function(track) {
            track.stop();
        });
    }


    call = async (friendId) => {

        try {
            Toast.show({
                icon: 'loading',
                content: '开启中',
                duration: 0
            })
            const  res = await getUserStatus({
                userId: friendId
            })

            navigator.mediaDevices.getUserMedia({video: true, audio: true})
                .then((stream) => {
                    const call = global.peer.call(res?.data?.peerId, stream);
                    call.on("stream", (remoteStream) => {
                        runInAction(() => {
                            this.stream = stream;
                            this.remoteStream = remoteStream;
                            this.visible = true;
                            Toast.clear();
                        })
                    });
                    call.on("error", (e)=>{
                        console.log(e.toString())
                        this.close(stream);
                        runInAction(()=>{
                            this.visible = false;
                        })
                    })
                    call.on("close", ()=>{
                        this.close(stream);
                        runInAction(()=>{
                            this.visible = false;
                        })
                    })
                    global.peer.on('error', (e) => {
                        console.log(e.toString());
                        runInAction(() => {
                            this.visible = false;
                        })
                        this.close();
                        Toast.clear();
                        Toast.show("通话失败");
                    })
                })
                .catch((err) => {
                    console.log(err.toString());
                    runInAction(() => {
                        this.visible = false;
                    })
                    Toast.clear();
                    Toast.show("通话失败");
                })
        }catch (e){
            console.log(e.toString());
            runInAction(() => {
                this.visible = false;
            })
            Toast.clear();
            Toast.show("通话失败");
        }

    }

    answer = (call) => {
        Toast.show({
            icon: 'loading',
            content: '接听中',
            duration: 0
        })
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream)=>{
                call.answer(stream);
                call.on("stream", (remoteStream) => {
                    runInAction(()=>{
                        this.stream = stream;
                        this.remoteStream = remoteStream;
                        this.visible = true;
                        Toast.clear();
                    })
                });
                call.on("error", (e)=>{
                    console.log(e.toString());
                    this.close(stream);
                    runInAction(()=>{
                        this.visible = false;
                    })
                })
                call.on("close", ()=>{
                    this.close(stream);
                    runInAction(()=>{
                        this.visible = false;
                    })
                })

                global.peer.on('error', (e)=>{
                    console.log(e.toString());
                    this.close(stream);
                    runInAction(()=>{
                        this.visible = false;
                    })
                    Toast.clear();
                    Toast.show("通话失败");
                })
            })
            .catch((err)=>{
                console.log(err)
                runInAction(()=>{
                    this.visible = false;
                })
                Toast.clear();
                Toast.show("通话失败");
            })
    }


}

const CallStore = new CallSource();
export default CallStore;
