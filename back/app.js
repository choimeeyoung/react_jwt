const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();

const hpp = require('hpp');
const helmet = require('helmet');


// REST API
// app.get    : 가져오다.
// app.post   : 생성하다
// app.put    : 전체수정
// app.delete : 제거
// app.patch : 부분수정
// app.options : 서버에 요청 보내면 받아 줄수 있어 ? 라고 확일 할때 사용
// app.head    : 헤더만 가져온다 .
// 사용이 애매모호 한 경우에는 Post 사용 하면 된다 .

// 변경사항있을시 자동으로 서버 재실행 : nodemon
// npm i -D nodemon@2
// nodemon app 실행

// cors Error : 요청을 보내는 포트의 번호와 요청을 받는 포트의 번호가 서로 다를때 브라우저에서 요청을 차단 함
// 해결방법 : 서버의 Header 에 cors 설정을 해준다
// npm i cors

if(process.env.NODE_ENV === 'production'){                       // 배포 모드 일 경우
    app.use(hpp());
    app.use(helmet());
}

app.set('jwt-secret','SeCrEtKeYfOrHaShInG')

// front 에서 넘어온 Data 를 해석해서 req.body~ 에 넣어준다.
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// cookie parser 설정
app.use(cookieParser('cmyreactjwt'));

app.use(cors({
    origin: true,           // 추후 우리의 사이트 주소로 수정
    credentials:true                                                    // cookies 값을 Front 와 같이 공유 하려고 할때 사용
}));

// session 설정
app.use(session({
    httpOnly: true,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}))



app.use('/api',require('./routers/api'));

app.listen(3060,()=>{
    console.log("서버 실행 중")
})



