/**
 * Created by mayajuni on 2016. 11. 22..
 */
import { Application } from 'express';
import {ExampleRouter} from './router/example/example.router';
import { SignUpRouter } from './router/sign-up/sign-up.router';

export class AppRouter {
    private _app: Application;

    constructor(app: Application) {
        this._app = app;
        this._router();
    }

    // 여기에 router를 추가 하면 된다.
    private _router() {
        const app = this._app;
        ExampleRouter.create(app);
        SignUpRouter.create(app);
    }
}
