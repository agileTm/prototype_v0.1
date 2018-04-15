import { Application, Router } from 'express';
import { validation } from '../../module/validation.module';
import { wrap } from '../../module/utils.module';
import { RethinkDB } from '../../module/rethinkdb.module';
import { checkJWT } from '../../module/jwt.module';
import { questionSchema } from './info-trade.json-schema';
import { Config } from '../../config/config';
import { ErrorModule } from '../../module/error.module';

export class InfoTradeRouter {
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
        this.router.post('/question', checkJWT('A'), validation(questionSchema), wrap(async (req: any, res: any) => {
            const user = req.user;
            const params = req.body;

            const result: any = await this._r.table(Config.TABLE_TRADE).insert({
                userId: user.id,
                type: user.type,
                title: params.title,
                content: params.content,
                state: 'ing',
                date: new Date().getTime()
            });

            res.send(result.generated_keys[0]);
        }));

        this.router.delete('/question/:id', checkJWT('A'), wrap(async (req: any, res: any) => {
            const id = req.params.id;
            const r = this._r;

            const result = await r.table(Config.TABLE_TRADE).filter({id, userId: req.user.id});
            if (result.length < 1) {
                ErrorModule.errThrow(401, 'no_auth');
            }

            await r.table(Config.TABLE_TRADE).get(id).delete();

            res.end();
        }));
    }

    public static create(app: Application) {
        const router = new InfoTradeRouter();
        app.use('/api/infoTrade', router.router);
    }
}
