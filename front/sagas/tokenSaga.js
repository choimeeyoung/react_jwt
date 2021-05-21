import {all,fork,takeLatest,call,put} from 'redux-saga/effects';
import axios from "axios";


function tokenAPI(data){
     return axios.post('http://localhost:3065/api/token',data)
}

function tokenCheckAPI(data){
    return axios.get('http://localhost:3065/api/token',{headers:{'x-access-token':data.token}})
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
function* tokenCheck(action){

    try{
        const result = yield call(tokenCheckAPI,action.data);
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
