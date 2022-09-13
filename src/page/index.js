
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import Login from "./login/login";
import Home from "./home";
import TalkList from "./talkList";
import FriendList from "./friendList";
import AddFriend from "./addFriend";
import TalkPage from "./talkPage";
import React, {useEffect} from "react";
import {inject} from "mobx-react";
import {CallPage} from "../wiget/index";
import {Modal} from "antd-mobile";


const Index = inject('stores')((props) => {
    const {userStore, socketStore, callStore} = props.stores;
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        global.eventBus.addListener('onAnswer', goCallPage);
        return ()=>{
            global.eventBus.removeListener('onAnswer', goCallPage);
        }
    },[])

    const goCallPage = (data) => {
        callStore.answer(data.call,(stream, remoteStream)=>{
            Modal.alert({
                content: (
                    <CallPage
                        remoteStream={remoteStream}
                        stream={stream}
                    />
                ),
            })
        }, ()=>{

        });
    }

    useEffect(()=>{
        //如果不是去登录和注册则判断是否已登录
        if(location.pathname !== '/login' && location.pathname !== '/register'){
            if(!userStore.getUserInfo()){
                navigate('/login');
            }
        }
    },[location])

    useEffect(()=>{
        const userInfo = userStore.getUserInfo();
        socketStore.init({
            userInfo
        })
        return ()=>{
            socketStore.clearData();
        }
    },[])

    useEffect(()=>{
        const userInfo = userStore.getUserInfo();
        socketStore.init({
            userInfo,
        })
    },[userStore.userInfo])

    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} >
                <Route path={"/talkList"} element={<TalkList/>}/>
                <Route path={"/friendList"} element={<FriendList/>}/>
                <Route path={"/addFriend"} element={<AddFriend/>}/>
            </Route>
            <Route path="/talk" element={<TalkPage />} />
        </Routes>
    )
})

export default Index;

