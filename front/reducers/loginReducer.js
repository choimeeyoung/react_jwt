import produce from 'immer';

export const initialState = {
    loginStatus:"로그인 실행전",
    loginResult: {
        success: false,
        message: "",
        data: {
            user_id: "",
            authority: 0,
            able_store_id: null,
            able_store_name: null
        }
    }
}

export const loginRequestAction = (data) =>{
    return {
        type:'LOGIN_REQUEST',
        data
    }
}

const reducer = (state = initialState,action) =>{
    return produce(state,(draft) => {
        switch(action.type){
            case 'LOGIN_REQUEST':
                draft.loginStatus = '로그인 요청중'
                break;
            case 'LOGIN_SUCCESS':
                draft.loginStatus = '로그인 요청성공'
                draft.loginResult = action.data
                break;
            case 'LOGIN_FAIL':
                draft.loginStatus = '로그인 실패'
                break;
        }
    })
}

export default reducer;


