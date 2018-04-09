import { Application, Router } from 'express';
import { validation } from '../../module/validation.module';
import { wrap } from '../../module/utils.module';
import { ExampleService } from '../../service/example.service';
import { exampleSchema } from './example.json-schema';

export class ExampleRouter {
    router: Router;

    private _exampleService: ExampleService;

    /**
     * 라우터 선언
     */
    constructor() {
        this.router = Router();
        this._exampleService = new ExampleService();
        this._router();
    }

    /**
     * room 라우터들
     *
     * @private
     */
    private _router() {
        this.router.get('/', validation(exampleSchema), wrap(async (req: any, res: any) => {
            const msg = this._exampleService.get();
            res.send(req.query.name + msg);
        }));
    }

    public static create(app: Application) {
        const router = new ExampleRouter();
        app.use('/api/example', router.router);
    }
}
