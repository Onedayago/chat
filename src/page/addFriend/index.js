
import React, {useEffect} from "react";
import {SearchBar, List, Button} from "antd-mobile";
import {inject, Observer} from "mobx-react";


const AddFriend = inject('stores')((props) => {
    const {userStore, addFriendStore} = props.stores;

    useEffect(()=>{
        return ()=>{
            addFriendStore.clearData();
        }
    },[])

    const onSearch = async (value) => {
        const userInfo = userStore.getUserInfo();
        await addFriendStore.searchUser(userInfo?.id, value);
    }

    const onAddFriend = async (friendId, index) => {
        const userInfo = userStore.getUserInfo();
        await addFriendStore.addFriend({
            friendId,
            userId: userInfo?.id
        }, index);
    }

    const renderList = () => {
        const {userList} = addFriendStore;
        return(
            <List header='用户列表'>
                {
                    userList.map((item, index)=>{
                        return (
                            <List.Item
                                key={index}
                                onClick={() => {}}
                                arrow={false}
                                extra={
                                    <Button
                                        onClick={async () => {
                                            await onAddFriend(item?.id, index);
                                        }}
                                    >
                                        添加
                                    </Button>
                                }
                            >
                                {item?.username}
                            </List.Item>
                        )
                    })
                }
            </List>
        )
    }

    return(
        <Observer>
            {()=>(
                <>
                    <SearchBar
                        placeholder='请输入内容'
                        showCancelButton
                        onSearch={onSearch}
                    />
                    {renderList()}
                </>
            )}
        </Observer>

    )
})

export default AddFriend;
