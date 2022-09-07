
import { Routes, Route } from "react-router-dom";
import Login from "./login/login";
import Home from "./home";
import TalkList from "./talkList";
import FriendList from "./friendList";
import AddFriend from "./addFriend";
import TalkPage from "./talkPage";
import CallPage from "./callPage";

const Index = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} >
                <Route path={"/talkList"} element={<TalkList/>}/>
                <Route path={"/friendList"} element={<FriendList/>}/>
                <Route path={"/addFriend"} element={<AddFriend/>}/>
            </Route>
            <Route path="/talk" element={<TalkPage />} />
            <Route path="/callPage" element={<CallPage />} />
        </Routes>
    )
}

export default Index;

