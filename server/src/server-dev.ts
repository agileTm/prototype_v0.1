import AppServer from './app.server';

let _resolve: any;
const readyPromise = new Promise(resolve => {
    _resolve = resolve;
});

const appServer = new AppServer();
appServer.listen().then(() => {
    _resolve();
});

/* 테스트를 위해서 아래와 같이 처리 한다. */
export const ready = readyPromise;
export const close = () => appServer.server.close();
