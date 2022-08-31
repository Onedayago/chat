

import React from "react";
import {
    Form,
    Input,
    Button,
} from 'antd-mobile';

const Login = () => {

    const onFinish = () => {

    }
    return(
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

export default Login;
