import produce from 'immer';

export const initialState = {
    logoutStatus:"로그아웃 실행전",
    logoutResult: {
        success:false,
        message:""
    }
}

export const logoutRequestAction = () =>{
    return {
        type:'LOGOUT_REQUEST',
    }
}

const reducer = (state = initialState,action) =>{
    return produce(state,(draft) => {
        switch(action.type){
            case 'LOGOUT_REQUEST':
                draft.loginStatus = '로그아웃 요청중'
                break;
            case 'LOGOUT_SUCCESS':
                draft.loginStatus = '로그아웃 요청성공'
                draft.loginResult = action.data
                break;
            case 'LOGOUT_FAIL':
                draft.loginStatus = '로그아웃 실패'
                break;
        }
    })
}

export default reducer;


