


import React, {useState, useRef, useEffect, useImperativeHandle, forwardRef} from "react";
import {Avatar, Card, Input, Button, Toast, PullToRefresh} from "antd-mobile";
import styles from "./index.module.css";
import { useSize, useToggle} from 'ahooks';
import { AddCircleOutline } from 'antd-mobile-icons';
import PropTypes from "prop-types";

const Chat = forwardRef((props, ref) => {

    const {initMessage, onSend, onRefresh} = props;

    const [message, setMessage] = useState(initMessage);
    const [lastMsg, setLastMsg] = useState(initMessage[initMessage.length - 1]);
    const [showPanel, { toggle}] = useToggle(false);
    const [value, setValue] = useState('');
    const [type, setType] = useState('text');
    const footerRef = useRef(null);
    const footerSize = useSize(footerRef);
    const inputRef = useRef(null);
    const scrollRef = useRef(null);
    const listRef = useRef(null);
    const listSize = useSize(listRef);

    useImperativeHandle(ref,()=>({
        clear(){
            inputRef.current.clear();
        }
    }))

    useEffect(()=>{
        if(lastMsg?._id !== initMessage[initMessage.length - 1]?._id){
            toBottom();
            setLastMsg(initMessage[initMessage.length - 1]);
        }
    },[listSize])


    useEffect(()=>{
        setMessage(initMessage);
    }, [initMessage])

    const send = () => {
        onSend(type, value);
    }

    const toBottom = () => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }

    const renderUser = () => {
        return(
            <div className={styles.user}>
                <Avatar style={{ '--size': '3rem', '--border-radius': '1.5rem' }}/>
            </div>
        )
    }

    const renderTxt = (item) => {
        return(
            <Card bodyClassName={styles.txtBox}>
                {item?.content?.text}
            </Card>
        )
    }

    const renderContent = (item) => {
        switch (item?.msgType){
            case 'text':
                return renderTxt(item);
            default:
                return renderTxt(item);
        }
    }


    const renderLeftMessage = (item, index) => {
        return(
            <div className={styles.msgLeftBox} key={item._id}>
                {renderUser()}
                {renderContent(item)}
            </div>
        )
    }

    const renderRightMessage = (item, index) => {
        return(
            <div className={styles.msgRightBox} key={item._id}>
                {renderContent(item)}
                {renderUser()}
            </div>
        )
    }

    const renderPanel = () => {
        return(
            <div className={styles.panel}>
                <Button color={"primary"}>开始视频</Button>
            </div>
        )
    }

    const renderFooter = () => {
        return(
            <div className={styles.footBox} ref={footerRef}>
                <div className={styles.footTop}>
                    <Input
                        placeholder='请输入内容'
                        onChange={(value)=>setValue(value)}
                        value={value}
                        ref={inputRef}
                        onFocus={()=>{
                            toBottom();
                        }}
                    />
                    {Boolean(value)&&<Button color={"primary"} style={{width: '5rem'}} onClick={send}>发送</Button>}
                    <AddCircleOutline fontSize={'3rem'} onClick={toggle}/>
                </div>
                {showPanel&&renderPanel()}
            </div>
        )
    }

    const renderMsgList = () => {
        let height = footerSize?.height??0;
        return(
            <div className={styles.msgList} style={{bottom: height+'px'}} ref={scrollRef}>
                <PullToRefresh
                    onRefresh={onRefresh}
                >
                    <div ref={listRef}>
                        {
                            message.map((item, index)=>{
                                if(item?.position === "left"){
                                    return renderLeftMessage(item, index);
                                }else{
                                    return renderRightMessage(item, index);
                                }
                            })
                        }
                    </div>
                </PullToRefresh>
            </div>
        )
    }

    return(
        <div>
            {renderMsgList()}
            {renderFooter()}
        </div>
    )
})

Chat.defaultProps = {
    initMessage: [],
    onSend: ()=>{},
    onRefresh: ()=>{},
}

Chat.propTypes = {
    initMessage: PropTypes.array,
    onSend: PropTypes.func,
    onRefresh: PropTypes.func,
}

export default Chat;
