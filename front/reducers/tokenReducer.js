import produce from 'immer';

export const initialState = {
    tokenStatus : "",
    tokenValue :{
        success:false,
        message:"",
        token:"",
    },

    tokenCheckStatus :"",
    tokenCheckValue:{
        success: false,
        info :{
            user_id: '',
            authority: 1,
            iat: 0,
            exp: 0,
            iss: '',
            sub: ''
        },
    }
}

export const tokenRequestAction = (data) =>{
    return {
        type:'TOKEN_REQUEST',
        data
    }
}

const reducer = (state = initialState,action) =>{
    return produce(state,(draft) => {
        switch(action.type){
            case 'TOKEN_REQUEST':
                draft.tokenStatus = '토큰 요청중'
                break;
            case 'TOKEN_SUCCESS':
                console.log("================>")
                console.log(action.data)
                draft.tokenStatus = '토큰 요청성공'
                draft.tokenValue = action.data
                break;
            case 'TOKEN_FAIL':
                draft.tokenStatus = '토큰 요청실패'
                break;

            case 'TOKEN_CHECK_REQUEST':
                draft.tokenCheckStatus ='토큰확인 요청중'
                break;
            case 'TOKEN_CHECK_SUCCESS':
                draft.tokenCheckStatus ='토큰확인 요청성공'
                draft.tokenCheckValue = action.data
                break;
            case 'TOKEN_CHECK_FAIL':
                draft.tokenCheckStatus ='토큰확인 요청실패'
                break;
        }
    })
}

export default reducer;


