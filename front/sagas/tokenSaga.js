import {all,fork,takeLatest,call,put} from 'redux-saga/effects';
import axios from "axios";

function tokenAPI(data){
     return axios.post('http://15.164.95.180/api/token',data,{withCredentials:true})
}

function tokenCheckAPI(){
    return axios.get('http://15.164.95.180/api/token',{withCredentials:true})
}

function* token(action){
    try{
        const result = yield call(tokenAPI,action.data);
        yield put({
            type: 'TOKEN_SUCCESS',
            data: result.data
        })
    }catch(error){
        yield put({
            type:'TOKEN_FAIL',
            error:error.response
        })
    }
}
function* tokenCheck(){
    try{
        const result = yield call(tokenCheckAPI);
        yield put({
            type: 'TOKEN_CHECK_SUCCESS',
            data: result.data
        })
    }catch(error){
        yield put({
            type:'TOKEN_CHECK_FAIL',
            error:error.response
        })
    }
}

function* watchToken(){
    yield takeLatest('TOKEN_REQUEST', token)        // 'LOGIN_REQUEST' Action 이 실행 되면 login 함수를 실행 하겠음을 의미
}
function* watchCheckToken(){
    yield takeLatest('TOKEN_CHECK_REQUEST', tokenCheck)
}

export default function* tokenSaga(){
    yield all([
        fork(watchToken),
        fork(watchCheckToken)
    ])
}
