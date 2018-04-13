import { Application, Router } from 'express';
import { validation } from '../../module/validation.module';
import { wrap } from '../../module/utils.module';
import { signUpSchema } from './sign-up.json-schema';
import { RethinkDB } from '../../module/rethinkdb.module';
import { Config } from '../../config/config';
import { Crypto } from '../../module/crypto.module';
import { ErrorModule } from '../../module/error.module';

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
            const r = this._r;

            const id = params.id;
            const password = Crypto.encrypt(params.password, Config.PASSWORD_KEY);

            const duplicateCheck = await r.table(Config.TABLE_MEMBER).get(id);

            if (duplicateCheck) {
                ErrorModule.errThrow(412, 'Duplicate ID');
            }

            await this._r.table(Config.TABLE_MEMBER).insert({
                id,
                password,
                type: params.type
            });

            res.end();
        }));
    }

    public static create(app: Application) {
        const router = new SignUpRouter();
        app.use('/api/signup', router.router);
    }
}
