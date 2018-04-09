import * as AJV from 'ajv';

const ajv = AJV(({removeAdditional: true}));

export const validation = (jsonSchema: object) => (req: any, res: any, next: any) => {
    const param = Object.keys(req.body).length === 0 ? req.query : req.body;
    if (!ajv.validate(jsonSchema, param)) {
        const err: any = new Error(ajv.errorsText());
        err.code = 'validation';
        err.status = 422;
        next(err);
    } else {
        next();
    }
};