
import React, {useEffect} from "react";
import {Button, Dialog, List} from "antd-mobile";
import {inject, Observer} from "mobx-react";
import {useNavigate} from "react-router-dom";

const FriendList = inject('stores')((props) => {

    const {friendListStore, userStore} = props.stores;
    const navigate = useNavigate();

    useEffect(()=>{
        const userInfo = userStore.getUserInfo();
        friendListStore.getFriendList({
            userId: userInfo?.id
        });
        friendListStore.getAddFriendMsg({
            userId: userInfo?.id
        });
        return ()=>{
            friendListStore.clearData();
        }
    }, []);

    const acceptAddFriend = async (item, index) => {
        const userInfo = userStore.getUserInfo();
        const res = await friendListStore.acceptAddFriend({
            id: item.id,
            userId: userInfo?.id
        }, index);
        if(res){
            await friendListStore.getFriendList({
                userId: userInfo?.id
            });
        }
    }

    const deleteFriend = async (item, index) => {
        const userInfo = userStore.getUserInfo();
        await friendListStore.deleteFriend({
            userId: userInfo?.id,
            friendId: item?.userId,
        }, index);
    }

    const refuseAddFriend = async (item, index) => {
        const userInfo = userStore.getUserInfo();
        await friendListStore.refuseAddFriend({
            id: item?.id,
            userId: userInfo?.id,
            friendId: item?.userId,
        }, index);
    }

    const goTalk = (item, index) => {
        navigate('/talk', {state: {friendId: item.userId, friendName: item.username, peerId: item.peerId}})
    }

    const renderAddAction = (item, index) => {
        return(
            <>
                <Button
                    color={"primary"}
                    onClick={()=>acceptAddFriend(item, index)}
                >
                    同意
                </Button>
                <Button
                    color={"danger"}
                    onClick={()=>refuseAddFriend(item, index)}
                >
                    拒绝
                </Button>
            </>
        )
    }

    const renderListAction = (item, index) => {
        return(
            <>
                <Button color={"danger"} onClick={()=>deleteFriend(item, index)}>删除</Button>
            </>
        )
    }

    const renderAddList = () => {
        const {addFriendList} = friendListStore;
        return(
            <List header='好友请求列表'>
                {
                    addFriendList.map((item, index)=>{
                        return <List.Item key={index} extra={renderAddAction(item, index)}>
                            {item?.username}
                        </List.Item>
                    })
                }
            </List>
        )
    }

    const renderFriendList = () => {
        const {friendList} = friendListStore;
        return(
            <List header='好友列表'>
                {
                    friendList.map((item, index)=>{
                        return <List.Item key={index} extra={renderListAction(item, index)} onClick={()=>goTalk(item, index)}>
                            {item?.username}
                        </List.Item>
                    })
                }
            </List>
        )
    }

    return(
        <Observer>
            {()=>(
                <>
                    {renderAddList()}
                    {renderFriendList()}
                </>
            )}
        </Observer>
    )
})

export default FriendList;
