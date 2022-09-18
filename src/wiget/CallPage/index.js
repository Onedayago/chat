import React, {useRef, useEffect} from "react";
import styles from "./index.module.css";
import {Button} from "antd-mobile";
import PropTypes from "prop-types";


const CallPage = (props) => {
    const {stream, remoteStream, hangUp, visible} = props;
    const localVideo = useRef(null);
    const remoteVideo = useRef(null);


    useEffect(()=>{
        if(visible && stream){
            localVideo.current.srcObject= stream;
            localVideo.current.play();
        }
    },[stream, visible])

    useEffect(()=>{
        if(visible && remoteStream){
            remoteVideo.current.srcObject= remoteStream;
            remoteVideo.current.play();
        }
    },[remoteStream, visible])

    if(visible){
        return(
            <div className={styles.container}>
                <video
                    ref={localVideo}
                    className={styles.video}
                />
                <video
                    ref={remoteVideo}
                    className={styles.video}
                />
                <Button color={"primary"} onClick={hangUp}>挂断</Button>
            </div>
        )
    }
    return null;
}

CallPage.defaultProps = {
    visible: false,
}

CallPage.propTypes = {
    stream: PropTypes.any,
    remoteStream: PropTypes.any,
    answer: PropTypes.func,
    hangUp: PropTypes.func,
    visible: PropTypes.bool
}

export default CallPage;

