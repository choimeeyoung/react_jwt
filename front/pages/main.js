import React from 'react';
import AppLayout from "../componets/AppLayout";
import wrapper from "../store/configureStore";
import axios from "axios";
import {END} from "redux-saga";
import {useSelector,useDispatch} from "react-redux";
import {tokenRequestAction} from "../reducers/tokenReducer";

const Main = () =>{
    return (
        <AppLayout>
            <section>
                MainPage 입니다.
            </section>
        </AppLayout>
    )
}

// 페이지가 그려지기 이전에 서버와 통신 후 데이터를 가지고 온후에 Page 그려준다 (서버사이드 렌더링)
// getStaticProps : 거의 없음 / 블로그 글 / 바뀌는 정보가 매번 바뀌지 않을 때 사용
// getServerSideProps : 그때 그때 정보가 달라질때 , 즉 Server 에서 계속 새로운 정보를 가져와야 될때 사용
export const getServerSideProps = wrapper.getServerSideProps(async (context)=>{
    let {success , data , message} = useSelector((state) => state.loginReducer.loginResult);

    const dispatch = useDispatch()

    dispatch(tokenRequestAction({user_id:data.user_id,authority:data.authority}))


    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = cookie;

    context.store.dispatch({
        type:'TOKEN_CHECK_REQUEST',
    })

    context.store.dispatch(END)
    await context.store.sagaTask.toPromise();
})

export default Main;
