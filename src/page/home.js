
import React, {useEffect} from "react";
import { Badge, TabBar } from 'antd-mobile';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons';
import styles from "./home.module.css";
import {inject} from "mobx-react";


const Home = inject('stores')((props) => {
    const {userStore, socketStore, talkStore} = props.stores;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const userInfo = userStore.getUserInfo();
        socketStore.init({
            userInfo,
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

    useEffect(()=>{
        //如果不是去登录和注册则判断是否已登录
        if(location.pathname !== '/login' && location.pathname !== '/register'){
            if(!userStore.getUserInfo()){
                navigate('/login');
            }
        }
    },[location])

    const setRouteActive = (value) => {
        navigate(value);
    }

    const tabs = [
        {
            key: '/talkList',
            title: '对话列表',
            icon: <AppOutline />,
        },
        {
            key: '/friendList',
            title: '好友列表',
            icon: <AppOutline />,
        },
        {
            key: '/addFriend',
            title: '添加好友',
            icon: <AppOutline />,
        }
    ]

    return(
        <div className={styles.container}>
            <div className={styles.outlet}>
                <Outlet/>
            </div>
            <TabBar onChange={value => setRouteActive(value)}>
                {tabs.map(item => (
                    <TabBar.Item
                        key={item.key}
                        icon={item.icon}
                        title={item.title}
                    />
                ))}
            </TabBar>
        </div>
    )
})

export default Home;
