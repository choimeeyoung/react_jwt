import React, {useCallback, useEffect} from 'react';
import AppLayout from "../componets/AppLayout";
import useInput from "../hooks/useInput";
import {useDispatch, useSelector} from 'react-redux';
import {loginRequestAction,resetStateAction} from "../reducers/loginReducer";
import {tokenRequestAction} from "../reducers/tokenReducer";

const Index = () =>{
    let {loginResult} = useSelector((state) => state.loginReducer);
    let {tokenValue} = useSelector((state) => state.tokenReducer);

    // 반복되는 코드 => Hooks
    const [userId,onChangeUerId] = useInput('');
    const [userPw,onChangeUerPw] = useInput('');
    // const [userId,setUserId] = useState('');
    // const onChangeUserId = useCallback((e) => {
    //     setUserId(e.target.value);
    // },[]);

    // useDispatch: action 을 reducer 에 dispatch 해줌
    const dispatch = useDispatch();

    useEffect(()=>{
        if(loginResult.success && loginResult.message){
            const formData = {
                user_id : loginResult.data.user_id,
                authority:loginResult.data.authority
            }
            dispatch(tokenRequestAction(formData));
            window.location.href = '/admin';
        }else if(!loginResult.success && loginResult.message){
            dispatch(resetStateAction());
        }
    },[loginResult.success,loginResult.message])

    useEffect(() => {
        if(tokenValue.token){
            sessionStorage.setItem('token',tokenValue.token)
        }
    },[tokenValue.token])

    const loginSubmit =  useCallback(() =>{
        dispatch(loginRequestAction({userId,userPw}));
    },[userId,userPw]);

    return (
        <AppLayout>
           <article className="wrap">
                <section id="loginForm">
                    <h2>로그인</h2>
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
                    <div className="button" onClick={loginSubmit}>버튼</div>
                </section>
           </article>
        </AppLayout>
    )
}
export default Index;
