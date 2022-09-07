

import React from "react";
import {
    Form,
    Input,
    Button,
} from 'antd-mobile';
import {inject, Observer} from "mobx-react";
import {useNavigate} from "react-router-dom";

const Login = inject('stores')((props) => {
    const {userStore} = props.stores;
    const navigate = useNavigate();

    const onFinish = async (params) => {
        if(await userStore.doLogin(params)){
            navigate('/');
        }
    }
    return(
        <Observer>
            {
                ()=>(
                    <>
                        <Form
                            onFinish={onFinish}
                            footer={
                                <Button block type='submit' color='primary' size='large'>
                                    登录
                                </Button>
                            }
                        >
                            <Form.Item
                                name='username'
                                label='用户名'
                                rules={[{ required: true, message: '用户名不能为空' }]}
                            >
                                <Input  placeholder='请输入用户名' />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                label='密码'
                                rules={[{ required: true, message: '密码不能为空' }]}
                            >
                                <Input  placeholder='请输入密码' type={"password"}/>
                            </Form.Item>

                        </Form>
                    </>
                )
            }
        </Observer>

    )
})

export default Login;
