
import React, {useEffect, useRef} from "react";
import {Chat} from "../../wiget/index";
import {useLocation} from "react-router-dom";
import {inject, observer} from "mobx-react";

const TalkPage = inject('stores')(observer((props) => {

    const {state} = useLocation();
    const {talkStore, userStore } = props.stores;
    const chatRef = useRef(null);

    useEffect(() => {
        const userInfo = userStore.getUserInfo();
        talkStore.initData({
            friendInfo: state,
            userInfo,
        });
        return () => {
            talkStore.clearData();
        }
    }, [])


    const handleSend = async (type, val) => {
        const userInfo = userStore.getUserInfo();
        if (type === 'text' && val.trim()) {
            const res = await talkStore.sendMsg({
                userId: userInfo.id,
                friendId: state?.friendId,
                msgContent: val,
            })
            if(res){
                chatRef.current.clear();
            }
        }
    }

    return(
        <Chat
            ref={chatRef}
            initMessage={talkStore.msgList}
            onSend={handleSend}
            onRefresh={async () => {
                await talkStore.getMsgList(talkStore.pageSize, talkStore.lastId);
            }}
            disabled={talkStore.disabled}
        />
    )
}))

export default TalkPage;
