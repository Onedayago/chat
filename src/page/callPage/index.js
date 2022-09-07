
import React, {useEffect, useRef} from "react";
import styles from "./index.module.css";
import {inject, observer} from "mobx-react";
import {Button} from "antd-mobile";

const CallPage = inject('stores')(observer((props) => {
    const {callStore, userStore} = props.stores;
    const localVideo = useRef(null);

    useEffect(()=>{
        const userInfo = userStore.getUserInfo();
        callStore.initData({
            userInfo
        });
        return ()=>{
            callStore.clearData();
        }
    },[])

    useEffect(()=>{
        if(callStore.stream){
            localVideo.current.srcObject= callStore.stream;
            localVideo.current.play();
        }
    },[callStore.stream])

    const call = () => {
        callStore.call();
    }

    return(
        <div>
            <video
                ref={localVideo}
                className={styles.video}
                src={callStore?.stream}
            />
            <Button color={"primary"} onClick={call}>呼叫</Button>
        </div>
    )
}));

export default CallPage;
