
import React from "react";
import { Badge, TabBar } from 'antd-mobile';
import {Outlet, useNavigate} from "react-router-dom";
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons';
import styles from "./home.module.css";

const Home = () => {
    const navigate = useNavigate();

    const setRouteActive = (value) => {
        console.log(value)
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
}

export default Home;
