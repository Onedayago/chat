import React, {useRef, useEffect} from "react";
import styles from "./index.module.css";
import {Button} from "antd-mobile";
import PropTypes from "prop-types";


const CallPage = (props) => {
    const {stream, remoteStream, answer, hangUp} = props;
    const localVideo = useRef(null);
    const remoteVideo = useRef(null);

    useEffect(()=>{
        localVideo.current.srcObject= stream;
        localVideo.current.play();
    },[stream])

    useEffect(()=>{
        remoteVideo.current.srcObject= remoteStream;
        remoteVideo.current.play();
    },[remoteStream])

    return(
        <div>
            <video
                ref={localVideo}
                className={styles.video}
            />
            <video
                ref={remoteVideo}
                className={styles.video}
            />
            <Button color={"primary"} onClick={hangUp}>挂断</Button>
            <Button color={"primary"} onClick={answer}>接听</Button>
        </div>
    )

}

CallPage.defaultProps = {

}

CallPage.propTypes = {
    stream: PropTypes.any,
    remoteStream: PropTypes.any,
    answer: PropTypes.func,
    hangUp: PropTypes.func,
}

export default CallPage;

