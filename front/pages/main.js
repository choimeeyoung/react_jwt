import React from 'react';
import AppLayout from "../componets/AppLayout";
import serverSideProps from "../hooks/serverSiderProps";

const Main = () =>{
    return (
        <AppLayout>
            <section>
                MainPage 입니다.
            </section>
        </AppLayout>
    )
}

// 페이지가 그려지기 이전에 서버와 통신 후 데이터를 가지고 온후에 Page 그려준다 (서버사이드 렌더링)
// getStaticProps : 거의 없음 / 블로그 글 / 바뀌는 정보가 매번 바뀌지 않을 때 사용
// getServerSideProps : 그때 그때 정보가 달라질때 , 즉 Server 에서 계속 새로운 정보를 가져와야 될때 사용
export const getServerSideProps = serverSideProps;

export default Main;
