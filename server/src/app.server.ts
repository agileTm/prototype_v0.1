/**
 * Created by mayajuni on 2016. 11. 28..
 */
import * as express from 'express';
import App from './app';
import { LoggerModule } from './module/logger.module';

export default class AppServer {
    private port = process.env.PORT || 3000;
    public app: express.Application;
    public server: any;

    constructor() {
        this.createApp();
    }

    private createApp() {
        this.app = new App().app;
    }

    async listen() {
        this.server = this.app.listen(this.port, () => {
            LoggerModule.log('Express server listening on port ' + this.port);
        }).on('error', err => {
            LoggerModule.errorLog(err);
        });
    }
}