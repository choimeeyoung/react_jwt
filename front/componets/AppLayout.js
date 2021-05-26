import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import styles from '../public/css/AppLayout.module.css';
import {logoutRequestAction} from "../reducers/logoutReducer";

const AppLayout = ({children}) => {
    const dispatch = useDispatch();
    const {user_id} = useSelector((state) => state.tokenReducer.tokenCheckValue.info)
    const clickLogout = useCallback(() => {
        location.href='/';
        dispatch(logoutRequestAction())
    },[])
    return (
        <>
            {user_id &&
                <div className={styles.header}>
                    <p>{user_id} 님</p>
                    <span onClick={clickLogout}>로그아웃</span>
                    <ul>
                        <li>관리자메뉴</li>
                        <li>메뉴1</li>
                        <li>메뉴2</li>
                        <li>메뉴3</li>
                    </ul>
                </div>
            }

            {!user_id &&
                <div className={styles.header}>
                    <p>헤더영역입니다.</p>
                </div>
            }
            {children}
        </>
    )
}
AppLayout.prototypes = {
    children: PropTypes.node.isRequired
}

export default AppLayout;
