import wrapper from "../store/configureStore";
import axios from "axios";
import {END} from "redux-saga";

const serverSideProps = wrapper.getServerSideProps(async (context)=>{
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = cookie;

    context.store.dispatch({
        type:'TOKEN_CHECK_REQUEST',
    })

    context.store.dispatch(END)
    await context.store.sagaTask.toPromise();
})

export default serverSideProps;
