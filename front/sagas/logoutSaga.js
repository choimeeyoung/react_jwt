import {all,fork,takeLatest,call,put} from 'redux-saga/effects';
import axios from "axios";


function logoutAPI(){
     return axios.get('http://localhost:3065/api/token/delete',{withCredentials:true});
}

function* logout(action){
    try{
        const result = yield call(logoutAPI,action.data);
        yield put({
            type: 'LOGOUT_SUCCESS',
            data: result.data
        })
    }catch(error){
        yield put({
            type:'LOGOUT_FAILURE',
            error:error.response.data
        })
    }
}

function* watchLogout(){
    yield takeLatest('LOGOUT_REQUEST', logout)        // 'LOGIN_REQUEST' Action 이 실행 되면 login 함수를 실행 하겠음을 의미
}

export default function* loginSaga(){
    yield all([
        fork(watchLogout),
    ])
}
