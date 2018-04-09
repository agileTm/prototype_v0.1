/**
 * Created by mayajuni on 2016. 11. 18..
 */
import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { LoggerModule } from './module/logger.module';
import { ErrorModule } from './module/error.module';
import { AppRouter } from './app.router';


export default class App {
    public app: express.Application;
    private isProduction: boolean;
    private _r: any;

    constructor() {
        this.isProduction = process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() === 'production';
        this._connectDB();
        this._serverSetting();
        this._error();
    }

    private _serverSetting() {
        // create expressjs application
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        /* URL으로 인코딩된 부분을 해석하기 위한 옵션 */
        this.app.use(bodyParser.urlencoded({extended: false}));
        /* 쿠키 추출 미들웨어 선언 */
        this.app.use(cookieParser());
        /* 휘발성 로그 */
        this.app.use(logger('dev'));

        /* 실서버일때만 적용시킨다. */
        if (this.isProduction) {
            /* 로그를 파일로 저장 */
            this.app.use(LoggerModule.saveLogFile);
        }

        new AppRouter(this.app);
    }

    private _error() {
        /* Not Foud */
        this.app.use((req: express.Request, res: express.Response, next: Function) => {
            let err: any = new Error('not_found');
            err.status = 404;
            next(err);
        });

        /* 실서버일때만 적용시킨다. */
        if (this.isProduction) {
            /* 에러로그를 파일로 저장 */
            this.app.use(LoggerModule.saveErrorLogFile);
        }

        /* 에러 핸들러 */
        this.app.use(ErrorModule.handler);
    }

    private async _connectDB() {
        /*const rethinkdb = new RethinkDB(Config.DB, Config.HOST, Config.DB_TABLE);
        await rethinkdb.connect();
        this._r = rethinkdb.r;*/
    }
}
