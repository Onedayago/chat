
import React, {useEffect, useState} from "react";
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
import {inject, observer} from "mobx-react";


const Home = inject('stores')(observer((props) => {
    const {callStore} = props.stores;
    const navigate = useNavigate();
    const location = useLocation();
    const [activeKey, setActiveKey] = useState('/friendList');

    useEffect(()=>{
        if(location.pathname === '/'){
            navigate('/friendList');
        }else{
            setActiveKey(location.pathname);
        }
    },[location.pathname])

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
            <TabBar onChange={value => setRouteActive(value)} activeKey={activeKey} defaultActiveKey={'/friendList'}>
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
}))

export default Home;
