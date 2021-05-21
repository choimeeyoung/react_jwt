import React, {useEffect} from 'react';
import AppLayout from "../componets/AppLayout";
import {useDispatch, useSelector} from "react-redux";
import {tokenCheckRequestAction} from "../reducers/tokenReducer";
import wrapper from "../store/configureStore";
const Admin = () =>{
    const {tokenCheckValue} = useSelector((state) => state.tokenReducer)
    const dispatch = useDispatch();

    useEffect(async () => {
        const sessionToken = sessionStorage.getItem('token')
        const token = {token : sessionToken}
        await dispatch(tokenCheckRequestAction(token));
    },[])

    useEffect(() => {
        if(tokenCheckValue.info.authority == 1){
            alert("접근 권한 없음")
            location.href='/'
        }
    },[tokenCheckValue])


    return (
        <AppLayout>
            {tokenCheckValue.info.authority == 0 ? <h2>어드민 페이지 입니다.</h2> : <h2></h2>}
        </AppLayout>
    )
}

// 페이지가 그려지기 이전에 서버와 통신 후 데이터를 가지고 온후에 Page 그려준다 (서버사이드 렌더링)
export const getServerSideProps = wrapper.getServerSideProps((context)=>{
    // context.store.dispatch(tokenCheckRequestAction(token));
})



export default Admin;
