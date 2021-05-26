import {HYDRATE} from "next-redux-wrapper";
import {combineReducers} from 'redux';
import loginReducer from "./loginReducer";
import logoutReducer from "./logoutReducer";
import tokenReducer from "./tokenReducer";



// // Reducer : (이전상태,액션) => 다음상태
// const rootReducer = combineReducers({
//     index : (state = {},action) =>{
//         switch(action.type){
//             case HYDRATE:
//                 return {...state,...action.payload}
//             default : return state;
//         }
//     },
//     loginReducer,
//     tokenReducer,
// })


const rootReducer = (state,action) => {
    switch (action.type){
        case HYDRATE :
            console.log('HYDRATE',action);
            return action.payload;
        default:{
            const combinedReducer = combineReducers({
                loginReducer,
                logoutReducer,
                tokenReducer
            });
            return combinedReducer(state,action)
        }
    }
};
export default rootReducer;
