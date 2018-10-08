// express 모듈 불러온 후 express 변수에 저장
var express = require('express');

// http 모듈 불러온 후 http 변수에 저장
var http = require('http');

// body-parser 모듈 불러온 후 bodyParser 변수에 저장
var bodyParser = require('body-parser');

// express 객체를 app 변수에 저장
var app = express();

// body-parser 미들웨어 사용
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// http://서버주소/keyboard
app.get('/keyboard', function(req,res) {
    // 전달할 데이터
    var data = {
        'type' : 'buttons',
        'buttons' : ['웹', '채소', "정보"]
    };
    
    // JSON 형식으로 응답
    res.json(data);
});

// http://서버주소/message
app.post('/message', function(req, res) {
    // 유저가 입력한 데이터
    var msg = req.body.content;
    console.log('전달받은 메세지 : '+msg);
    
    var send = {};  // 응답할 데이터
    
    switch(msg) {
        case '웹':
            send = {
                'message' : {
                    'text' : 'client와 server간 메세지를 주고받는 역할을 해주는 소프트웨어랍니다.'
                }
            }
            break;
            
        case '앱':
            send = {
                'message' : {
                    'text' : '간단히 말하자면 OS 위에서 사용자가 직접 사용하게되는 소프트웨어랍니다.'
                }
            }
            break;
            
        case 'IOT':
            send = {
                'message' : {
                    'text' : '각종 사물에 센서와 통신 기능을 내장하여 인터넷에 연결하는 기술을 의미합니다.'
                }   /*,
                keyboard: {
                    'type' : 'buttons',
                    'buttons' : ['테스트1', '테스트2']
                }   */
            }
            break;
            
        default:
            send = {
                'message' : {
                    'text' : '알 수 없는 명령입니다!'
                }
            }
            break;
    }
    
    res.json(send);
});

// 9090포트로 서버 실행
http.createServer(app).listen(9090, function() {
    console.log('서버 실행 중..');
});