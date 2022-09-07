


import React, {useState, useRef, useEffect} from "react";
import {Avatar, Card, Input, Button, Toast} from "antd-mobile";
import styles from "./index.module.css";
import { useSize, useToggle} from 'ahooks';
import { AddCircleOutline } from 'antd-mobile-icons';
import PropTypes from "prop-types";

const Chat = (props) => {

    const {initMessage, onSend} = props;

    const [message, setMessage] = useState(initMessage);
    const [showPanel, { toggle}] = useToggle(false);
    const [value, setValue] = useState('');
    const [type, setType] = useState('text');
    const footerRef = useRef(null);
    const size = useSize(footerRef);

    useEffect(()=>{
        setMessage(initMessage);
    }, [initMessage])

    const send = () => {
        onSend(type, value);
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

            </div>
        )
    }

    const renderFooter = () => {
        return(
            <div className={styles.footBox} ref={footerRef}>
                <div className={styles.footTop}>
                    <Input placeholder='请输入内容' onChange={(value)=>setValue(value)} value={value}/>
                    {Boolean(value)&&<Button color={"primary"} style={{width: '5rem'}} onClick={send}>发送</Button>}
                    <AddCircleOutline fontSize={'3rem'} onClick={toggle}/>
                </div>
                {showPanel&&renderPanel()}
            </div>
        )
    }

    const renderMsgList = () => {
        let height = size?.height??0;
        return(
            <div className={styles.msgList} style={{bottom: height+'px'}}>
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
        )
    }

    return(
        <div>
            {renderMsgList()}
            {renderFooter()}
        </div>
    )
}

Chat.defaultProps = {
    initMessage: [],
    onSend: ()=>{},

}

Chat.propTypes = {
    initMessage: PropTypes.array,
    onSend: PropTypes.func,

}

export default Chat;
