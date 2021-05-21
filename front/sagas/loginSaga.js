import {all,fork,takeLatest,call,put} from 'redux-saga/effects';
import axios from "axios";


function loginAPI(data){
     return axios.get('/login?user_id='+data.userId+'&user_password='+data.userPw);
}

function* login(action){
    try{
        const result = yield call(loginAPI,action.data);
        yield put({
            type: 'LOGIN_SUCCESS',
            data: result.data
        })
    }catch(error){
        yield put({
            type:'LOGIN_FAILURE',
            error:error.response.data
        })
    }
}

function* watchLogin(){
    yield takeLatest('LOGIN_REQUEST', login)        // 'LOGIN_REQUEST' Action 이 실행 되면 login 함수를 실행 하겠음을 의미
}

export default function* loginSaga(){
    yield all([
        fork(watchLogin)
    ])
}
