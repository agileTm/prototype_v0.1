import { Application, Router } from 'express';
import { validation } from '../../module/validation.module';
import { wrap } from '../../module/utils.module';
import { signUpSchema } from './sign-up.json-schema';
import { RethinkDB } from '../../module/rethinkdb.module';
import { Config } from '../../config/config';
import { Crypto } from '../../module/crypto.module';

export class SignUpRouter {
    router: Router;
    private _r: any;

    /**
     * 라우터 선언
     */
    constructor() {
        this.router = Router();
        this._r = RethinkDB.r;
        this._router();
    }

    /**
     * room 라우터들
     *
     * @private
     */
    private _router() {
        this.router.post('/', validation(signUpSchema), wrap(async (req: any, res: any) => {
            const params = req.body;
            const password = Crypto.encrypt(params.password, Config.PASSWORD_KEY);
            await this._r.table(Config.TABLE_MEMBER).insert({
                id: params.id,
                password,
                type: params.type
            });
        }));
    }

    public static create(app: Application) {
        const router = new SignUpRouter();
        app.use('/api/signup', router.router);
    }
}
