import React, {useCallback, useEffect, useState} from 'react';
import AppLayout from "../componets/AppLayout";
import useInput from "../hooks/useInput";
import {useDispatch, useSelector} from 'react-redux';
import {loginRequestAction} from "../reducers/loginReducer";
import {tokenRequestAction} from "../reducers/tokenReducer";
import Router from "next/router";


const Index = () =>{
    let {success , data , message} = useSelector((state) => state.loginReducer.loginResult);

    const [userId,onChangeUerId] = useInput('');
    const [userPw,onChangeUerPw] = useInput('');

    // useDispatch: action 을 reducer 에 dispatch 해줌
    const dispatch = useDispatch();

    const loginSubmit = useCallback(() =>{
        dispatch(loginRequestAction({userId,userPw}));
    },[userId,userPw]);

    useEffect(()=>{
        if(!success && message){
            alert(message);
        }else if(success && message){
            alert(message);
            dispatch(tokenRequestAction({user_id:data.user_id,authority:data.authority}))

            Router.push('main')
        }
    },[success,message])

    return (
        <AppLayout>
           <article className="wrap">
                <section id="loginForm">
                    <h2>로그인입니다.</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>아이디</th>
                                <td><input type="text" name="userId" value={userId} onChange={onChangeUerId}/></td>
                            </tr>
                            <tr>
                                <th>패스워드</th>
                                <td><input type="text" name="userPw" value={userPw} onChange={onChangeUerPw}/></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="button" onClick={loginSubmit}>로그인</div>
                </section>
           </article>
        </AppLayout>
    )
}

export default Index;
