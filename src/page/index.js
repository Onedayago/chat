
import { Routes, Route } from "react-router-dom";
import Login from "./login/login";
import Home from "./home";
import TalkList from "./talkList";
import FriendList from "./friendList";
import AddFriend from "./addFriend";

const Index = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} >
                <Route path={"/talkList"} element={<TalkList/>}/>
                <Route path={"/friendList"} element={<FriendList/>}/>
                <Route path={"/addFriend"} element={<AddFriend/>}/>
            </Route>
        </Routes>
    )
}

export default Index;

