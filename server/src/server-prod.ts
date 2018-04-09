import AppServer from './app.server';

/* NODE_ENV default가 development이라서 변경 처리 */
process.env.NODE_ENV = 'production';

/* 서버 구동 */
const server = new AppServer();
server.listen();