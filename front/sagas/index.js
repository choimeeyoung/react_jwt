import {all,fork} from 'redux-saga/effects';
import axios from 'axios';
import loginSaga from "./loginSaga";
import logoutSaga from "./logoutSaga";
import tokenSaga from "./tokenSaga";


// rootSaga를 만들고 그안에 원하는 비동기 Action 을 넣어준다
// fork : 함수를 실행 하는 것 / 비동기 함수 호출 , 기다리지 않고 다음 것 실행
// call : 동기함수 호출 , 결과값을 받아 올때 까지 결과값을 받아 올때 까지 기다림
// put : dispatch , action 을 dispatch

// watchLogin,watchLogout => 1회성,1번밖에 실행이 안됨
// 해결방안 : while(true){} => 직관성 X
// while(true){
//     yield take('LOG_IN_REQUEST',login);
// }
// while(true){} => takeEvery 를 사용
// takeLatest => 클릭실수로 2번 클릭시 , 마지막 클릭한것만 적용이 됨
// takeLeading => 첫번쨰 클릭한것만 적용됨
// throttle : 지정한 시간동안에 한번만 요청이 됨 , [takeLatest , takeLeading 은 요청을 취소하는 것은 아님]

axios.defaults.baseURL = 'https://dev-api.bqu.kr/v1/able/membership';

export default function* rootSaga(){
    yield all([                         // all : 배열로 데이터를 받음 / 배열안의 모든 함수들을 동시에 실행 / fork,call 의 함수를 한번에 실행해 준다 .
        fork(loginSaga),
        fork(logoutSaga),
        fork(tokenSaga)
    ])
}
