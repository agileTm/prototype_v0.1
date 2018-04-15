import { sign, verify } from 'jsonwebtoken';
import { Config } from '../config/config';
import { ErrorModule } from './error.module';


export const signJWT = (data: any) => sign(data, Config.JWT_KEY);

export const verifyJWT = (jwt: string) => {
    return new Promise((resolve, reject) => {
        verify(jwt, Config.JWT_KEY, function (err: any, decoded: any) {
            if (err) {
                reject(err);
                return;
            }

            resolve(decoded);
        });
    });
};

export const checkJWT = (type?: 'A' | 'B') => (req: any, res: any, next: Function) => {
    let jwt = null;
    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                jwt = credentials;
            } else {
                next(ErrorModule.getError(401, 'invalid_token'));
            }
        } else {
            next(ErrorModule.getError(401, 'invalid_token'));
        }
    } else {
        next(ErrorModule.getError(401, 'invalid_token'));
    }

    if (jwt) {
        verifyJWT(jwt).then((data: any) => {
            if (type && type !== data.type) {
                next(ErrorModule.getError(401, 'wrong_type'));
            } else {
                req.user = data;
                next();
            }
        }).catch(e => {
            next(ErrorModule.getError(401, e.message));
        });
    }
};