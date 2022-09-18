
import React, {useEffect, useRef} from "react";
import {Chat, CallPage} from "../../wiget/index";
import {useLocation, useNavigate} from "react-router-dom";
import {inject, observer, Observer} from "mobx-react";


const TalkPage = inject('stores')(observer((props) => {

    const {state} = useLocation();
    const {talkStore, userStore, callStore } = props.stores;
    const chatRef = useRef(null);
    const navigate = useNavigate();

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

    const handleVideo = () => {
        callStore.call(state?.friendId);
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
            onVideo={handleVideo}
        />
    )
}))

export default TalkPage;
