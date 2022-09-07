
import React, {useEffect} from "react";
import {Chat} from "../../wiget/index";
import {useLocation} from "react-router-dom";
import {inject, observer} from "mobx-react";

const TalkPage = inject('stores')(observer((props) => {

    const {state} = useLocation();
    const {talkStore, userStore } = props.stores;

    useEffect(()=>{
        console.log(talkStore.msgList)
    },[talkStore.msgList])

    useEffect(()=>{
        const userInfo = userStore.getUserInfo();
        talkStore.getMsgList({
            userId: userInfo.id,
            friendId: state?.friendId
        });
        talkStore.initData();
        return ()=>{
            talkStore.clearData();
        }
    }, [])


    const handleSend = async (type, val) => {
        const userInfo = userStore.getUserInfo();
        if (type === 'text' && val.trim()) {
            await talkStore.sendMsg({
                userId: userInfo.id,
                friendId: state?.friendId,
                msgContent: val,
            })
        }
    }

    return(
        <Chat
            initMessage={talkStore.msgList}
            onSend={handleSend}
        />
    )
}))

export default TalkPage;
