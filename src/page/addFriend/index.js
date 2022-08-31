
import React from "react";
import {SearchBar, Toast} from "antd-mobile";

const AddFriend = () => {
    return(
        <div>
            <SearchBar
                placeholder='请输入内容'
                showCancelButton
                onSearch={val => {
                    Toast.show(`你搜索了：${val}`)
                }}
            />
        </div>
    )
}

export default AddFriend;
